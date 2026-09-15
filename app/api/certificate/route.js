import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import QRCode from "qrcode";

import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getAReport } from "@/queries/reports";
import { formatMyDate } from "@/lib/date";

import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get("courseId");
    const studentIdParam = searchParams.get("studentId");
    const credentialIdParam = searchParams.get("credentialId");

    const course = await getCourseDetails(courseId);

    // Resolve target user: if studentIdParam provided (e.g. from verification portal), use it; else use logged-in user
    let targetUser = null;
    if (studentIdParam) {
      try {
        const { User } = await import("@/model/user-model");
        targetUser = await User.findById(studentIdParam).lean();
      } catch (e) {
        console.warn("Could not find student by ID:", studentIdParam);
      }
    }

    if (!targetUser) {
      targetUser = await getLoggedInUser();
    }

    const report = await getAReport({
      course: courseId,
      student: targetUser?._id || targetUser?.id,
    });

    const completionDate = report?.completion_date
      ? formatMyDate(report?.completion_date)
      : formatMyDate(Date.now());

    const studentName =
      `${targetUser?.firstName || ""} ${targetUser?.lastName || ""}`.trim() ||
      "Student";
    const courseTitle = course?.title || "Course Completion";

    // Stable, elegant Credential ID
    const credentialId =
      credentialIdParam ||
      report?.credentialId ||
      `EDU-${(courseId || "CERT").slice(-6).toUpperCase()}-${(targetUser?.id ? targetUser.id.toString().slice(-6) : targetUser?._id ? targetUser._id.toString().slice(-6) : "849201").toUpperCase()}`;

    // Ensure credentialId is persisted on report
    if (report && !report.credentialId && (targetUser?.id || targetUser?._id)) {
      try {
        const { Report } = await import("@/model/report-model");
        await Report.findByIdAndUpdate(report.id || report._id, { credentialId });
      } catch (e) {
        console.warn("Could not save credentialId:", e.message);
      }
    }

    // Build public verification URL for QR Code
    // Prioritizes live Vercel / Production domain so smartphone cameras can scan and open globally from anywhere
    const liveBase =
      process.env.NEXT_PUBLIC_LIVE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")
        ? process.env.NEXT_PUBLIC_APP_URL
        : "https://educonnect-peach-phi.vercel.app");

    const liveDomainClean = liveBase.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const verificationUrl = `https://${liveDomainClean}/verify-cert/${credentialId}`;

    // Generate crisp QR Code PNG buffer for the verification URL
    const qrPngBytes = await QRCode.toBuffer(verificationUrl, {
      type: "png",
      width: 260,
      margin: 1,
      color: {
        dark: "#0F172A", // Rich dark slate
        light: "#FFFFFF",
      },
    });

    // Read fonts directly from public/fonts
    const publicDir = path.join(process.cwd(), "public");
    const kalamFontBytes = await fs.readFile(path.join(publicDir, "fonts", "kalam", "Kalam-Bold.ttf"));
    const montserratBoldBytes = await fs.readFile(path.join(publicDir, "fonts", "montserrat", "Montserrat-Bold.ttf"));
    const montserratMediumBytes = await fs.readFile(path.join(publicDir, "fonts", "montserrat", "Montserrat-Medium.ttf"));
    const montserratSemiBoldBytes = await fs.readFile(path.join(publicDir, "fonts", "montserrat", "Montserrat-SemiBold.ttf"));

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
    const montserratBold = await pdfDoc.embedFont(montserratBoldBytes);
    const montserratMedium = await pdfDoc.embedFont(montserratMediumBytes);
    const montserratSemiBold = await pdfDoc.embedFont(montserratSemiBoldBytes);

    const page = pdfDoc.addPage([841.89, 595.28]);
    const { width, height } = page.getSize();

    // 1. Background Fill
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.99, 0.99, 1.0),
    });

    // Background Guilloche pattern with subtle luxury opacity
    try {
      const patternBytes = await fs.readFile(path.join(publicDir, "pattern.jpg"));
      const pattern = await pdfDoc.embedJpg(patternBytes);
      page.drawImage(pattern, {
        x: 0,
        y: 0,
        width,
        height,
        opacity: 0.12,
      });
    } catch (e) {
      console.log("No pattern image, skipping pattern overlay");
    }

    // 2. Multi-tier Luxury Borders
    // Outer Navy Border
    page.drawRectangle({
      x: 22,
      y: 22,
      width: width - 44,
      height: height - 44,
      borderColor: rgb(0.08, 0.12, 0.24), // Deep Navy
      borderWidth: 3,
      color: rgb(1, 1, 1),
      opacity: 0.88,
    });

    // Inner Gold Pinstripe
    page.drawRectangle({
      x: 29,
      y: 29,
      width: width - 58,
      height: height - 58,
      borderColor: rgb(0.82, 0.68, 0.35), // Metallic Gold
      borderWidth: 1.2,
    });

    // Thin Interior Framing
    page.drawRectangle({
      x: 35,
      y: 35,
      width: width - 70,
      height: height - 70,
      borderColor: rgb(0.88, 0.90, 0.94),
      borderWidth: 0.8,
    });

    // Corner Accent Flourishes
    const corners = [
      { x: 30, y: 30 },
      { x: width - 42, y: 30 },
      { x: 30, y: height - 42 },
      { x: width - 42, y: height - 42 },
    ];
    corners.forEach((c) => {
      page.drawRectangle({
        x: c.x,
        y: c.y,
        width: 12,
        height: 12,
        color: rgb(0.82, 0.68, 0.35),
      });
    });

    // 3. Top EduConnect Logo & Branding
    const logoY = height - 105;
    try {
      const logoBytes = await fs.readFile(path.join(publicDir, "educonnect_cert_logo.png"));
      const logoImg = await pdfDoc.embedPng(logoBytes);
      const logoWidth = 165;
      const logoHeight = (logoImg.height / logoImg.width) * logoWidth;

      page.drawImage(logoImg, {
        x: width / 2 - logoWidth / 2,
        y: logoY,
        width: logoWidth,
        height: logoHeight,
      });
    } catch (err) {
      console.log("Fallback text for EduPlus logo:", err);
      const brandText = "EduPlus";
      const brandWidth = montserratBold.widthOfTextAtSize(brandText, 22);
      page.drawText(brandText, {
        x: width / 2 - brandWidth / 2,
        y: logoY + 10,
        size: 22,
        font: montserratBold,
        color: rgb(0.08, 0.16, 0.36),
      });
    }

    // 4. Main Certificate Header
    const titleText = "CERTIFICATE OF COMPLETION";
    const titleSize = 25;
    const titleWidth = montserratBold.widthOfTextAtSize(titleText, titleSize);
    page.drawText(titleText, {
      x: width / 2 - titleWidth / 2,
      y: logoY - 36,
      size: titleSize,
      font: montserratBold,
      color: rgb(0.08, 0.16, 0.36),
    });

    // Subtitle
    const bestowedText = "THIS IS PROUDLY PRESENTED TO";
    const bestowedSize = 10.5;
    const bestowedWidth = montserratSemiBold.widthOfTextAtSize(bestowedText, bestowedSize);
    page.drawText(bestowedText, {
      x: width / 2 - bestowedWidth / 2,
      y: logoY - 58,
      size: bestowedSize,
      font: montserratSemiBold,
      color: rgb(0.72, 0.54, 0.22), // Warm Gold
    });

    // 5. Recipient Name
    const nameSize = 36;
    const nameWidth = kalamFont.widthOfTextAtSize(studentName, nameSize);
    const nameY = logoY - 108;
    page.drawText(studentName, {
      x: width / 2 - nameWidth / 2,
      y: nameY,
      size: nameSize,
      font: kalamFont,
      color: rgb(0.08, 0.12, 0.22),
    });

    // Elegant name underline with center diamond
    const underlineW = Math.max(300, nameWidth + 60);
    page.drawLine({
      start: { x: width / 2 - underlineW / 2, y: nameY - 8 },
      end: { x: width / 2 + underlineW / 2, y: nameY - 8 },
      thickness: 1,
      color: rgb(0.82, 0.68, 0.35),
    });
    page.drawRectangle({
      x: width / 2 - 3,
      y: nameY - 11,
      width: 6,
      height: 6,
      color: rgb(0.82, 0.68, 0.35),
    });

    // 6. Course & Achievement Description
    const achievementLead = "for successfully completing all curriculum modules, practical hands-on exercises, and final assessments in";
    const leadSize = 11;
    const leadWidth = montserratMedium.widthOfTextAtSize(achievementLead, leadSize);
    page.drawText(achievementLead, {
      x: width / 2 - leadWidth / 2,
      y: nameY - 32,
      size: leadSize,
      font: montserratMedium,
      color: rgb(0.35, 0.42, 0.52),
    });

    // Course Title
    const courseSize = 19;
    const courseWidth = montserratBold.widthOfTextAtSize(courseTitle, courseSize);
    page.drawText(courseTitle, {
      x: width / 2 - Math.min(courseWidth, 680) / 2,
      y: nameY - 58,
      size: courseSize,
      font: montserratBold,
      color: rgb(0.29, 0.23, 1.0), // Elegant Indigo / EduConnect Primary
      maxWidth: 680,
    });

    // Verification & Date line
    const dateStr = `Issued on ${completionDate} • Verified Credential ID: ${credentialId}`;
    const dateSize = 9.5;
    const dateWidth = montserratMedium.widthOfTextAtSize(dateStr, dateSize);
    page.drawText(dateStr, {
      x: width / 2 - dateWidth / 2,
      y: nameY - 80,
      size: dateSize,
      font: montserratMedium,
      color: rgb(0.48, 0.54, 0.64),
    });

    // 7. Left Side: Official Metallic Gold Seal
    const sealSize = 90;
    const sealX = 85;
    const sealY = 60;
    try {
      const sealBytes = await fs.readFile(path.join(publicDir, "cert_gold_seal.jpg"));
      const sealImg = await pdfDoc.embedJpg(sealBytes);
      page.drawImage(sealImg, {
        x: sealX,
        y: sealY,
        width: sealSize,
        height: sealSize,
      });

      const sealLabel = "OFFICIAL MERIT SEAL";
      const sealSub = "Verified & Accredited";
      page.drawText(sealLabel, {
        x: sealX + sealSize / 2 - montserratBold.widthOfTextAtSize(sealLabel, 7.5) / 2,
        y: sealY - 12,
        size: 7.5,
        font: montserratBold,
        color: rgb(0.68, 0.52, 0.2),
      });
      page.drawText(sealSub, {
        x: sealX + sealSize / 2 - montserratMedium.widthOfTextAtSize(sealSub, 7) / 2,
        y: sealY - 22,
        size: 7,
        font: montserratMedium,
        color: rgb(0.45, 0.5, 0.6),
      });
    } catch (err) {
      console.log("Seal image skipped:", err);
    }

    // 7.5 Center: Official Dynamic Verification QR Code
    try {
      const qrImg = await pdfDoc.embedPng(qrPngBytes);
      const qrSize = 64;
      const qrX = width / 2 - qrSize / 2;
      const qrY = 56;

      // Card frame for high contrast scanning
      page.drawRectangle({
        x: qrX - 4,
        y: qrY - 4,
        width: qrSize + 8,
        height: qrSize + 8,
        color: rgb(1, 1, 1),
        borderColor: rgb(0.85, 0.88, 0.94),
        borderWidth: 1,
      });

      page.drawImage(qrImg, {
        x: qrX,
        y: qrY,
        width: qrSize,
        height: qrSize,
      });

      const qrLabel = "SCAN TO VERIFY";
      const qrSub = `${liveDomainClean}/verify-cert`;
      page.drawText(qrLabel, {
        x: qrX + qrSize / 2 - montserratBold.widthOfTextAtSize(qrLabel, 6.5) / 2,
        y: qrY - 12,
        size: 6.5,
        font: montserratBold,
        color: rgb(0.29, 0.23, 1.0),
      });
      page.drawText(qrSub, {
        x: qrX + qrSize / 2 - montserratMedium.widthOfTextAtSize(qrSub, 6) / 2,
        y: qrY - 21,
        size: 6,
        font: montserratMedium,
        color: rgb(0.45, 0.5, 0.6),
      });
    } catch (qrErr) {
      console.warn("QR code embed skipped:", qrErr);
    }

    // 8. Right Side: Sharif Miah Signature in fluid handwritten calligraphy
    const sigX = width - 260;
    const sigY = 95;

    // Authentic calligraphy signature
    page.drawText("Sharif Miah", {
      x: sigX + 10,
      y: sigY + 12,
      size: 32,
      font: kalamFont,
      color: rgb(0.12, 0.16, 0.32), // Elegant fountain pen ink
    });

    // Signature line
    page.drawLine({
      start: { x: sigX, y: sigY + 5 },
      end: { x: sigX + 180, y: sigY + 5 },
      thickness: 1.2,
      color: rgb(0.2, 0.25, 0.35),
    });

    // Signee Name: Sharif Miah
    const sigName = "Sharif Miah";
    const sigNameSize = 12;
    page.drawText(sigName, {
      x: sigX,
      y: sigY - 10,
      size: sigNameSize,
      font: montserratBold,
      color: rgb(0.08, 0.12, 0.22),
    });

    // Signee Title: Founder & Lead Instructor, EduPlus
    const sigTitle = "Founder & Lead Instructor, EduPlus";
    const sigTitleSize = 8.5;
    page.drawText(sigTitle, {
      x: sigX,
      y: sigY - 22,
      size: sigTitleSize,
      font: montserratMedium,
      color: rgb(0.45, 0.5, 0.6),
    });

    /* -----------------
     *
     * Generate and send Response
     *
     *-------------------*/
    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="EduPlus-Certificate-${credentialId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return new Response(JSON.stringify({ error: "Failed to generate certificate", details: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
