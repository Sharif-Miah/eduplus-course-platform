const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const fs = require("fs");
const path = require("path");

async function generateCertificate() {
  const publicDir = path.join(__dirname, "..", "public");

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const kalamFontBytes = fs.readFileSync(path.join(publicDir, "fonts", "kalam", "Kalam-Bold.ttf"));
  const montserratBoldBytes = fs.readFileSync(path.join(publicDir, "fonts", "montserrat", "Montserrat-Bold.ttf"));
  const montserratMediumBytes = fs.readFileSync(path.join(publicDir, "fonts", "montserrat", "Montserrat-Medium.ttf"));
  const montserratItalicBytes = fs.readFileSync(path.join(publicDir, "fonts", "montserrat", "Montserrat-Italic.ttf"));
  const montserratSemiBoldBytes = fs.readFileSync(path.join(publicDir, "fonts", "montserrat", "Montserrat-SemiBold.ttf"));

  const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
  const montserratBold = await pdfDoc.embedFont(montserratBoldBytes);
  const montserratMedium = await pdfDoc.embedFont(montserratMediumBytes);
  const montserratItalic = await pdfDoc.embedFont(montserratItalicBytes);
  const montserratSemiBold = await pdfDoc.embedFont(montserratSemiBoldBytes);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);

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

  // Optional background pattern if exists
  try {
    const patternBytes = fs.readFileSync(path.join(publicDir, "pattern.jpg"));
    const pattern = await pdfDoc.embedJpg(patternBytes);
    page.drawImage(pattern, {
      x: 0,
      y: 0,
      width,
      height,
      opacity: 0.12,
    });
  } catch (e) {
    console.log("No pattern image, continuing.");
  }

  // 2. Multi-tier Luxury Borders
  // Outer Navy Border
  page.drawRectangle({
    x: 22,
    y: 22,
    width: width - 44,
    height: height - 44,
    borderColor: rgb(0.08, 0.12, 0.24), // #141f3d
    borderWidth: 3,
    color: rgb(1, 1, 1),
    opacity: 0.85,
  });

  // Inner Gold Pinstripe
  page.drawRectangle({
    x: 29,
    y: 29,
    width: width - 58,
    height: height - 58,
    borderColor: rgb(0.82, 0.68, 0.35), // Luxury gold
    borderWidth: 1.2,
  });

  // Thin Interior Frame
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
  corners.forEach(c => {
    page.drawRectangle({
      x: c.x,
      y: c.y,
      width: 12,
      height: 12,
      color: rgb(0.82, 0.68, 0.35),
    });
  });

  // 3. Top EduConnect Logo & Branding
  const logoBytes = fs.readFileSync(path.join(publicDir, "educonnect_cert_logo.png"));
  const logoImg = await pdfDoc.embedPng(logoBytes);
  const logoWidth = 165;
  const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
  const logoY = height - 105;

  page.drawImage(logoImg, {
    x: width / 2 - logoWidth / 2,
    y: logoY,
    width: logoWidth,
    height: logoHeight,
  });

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
    color: rgb(0.72, 0.54, 0.22), // Warm gold
  });

  // 5. Recipient Name
  const studentName = "Sharif Miah";
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

  // Elegant name underline with diamond
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
  const courseTitle = "Learn Python Masterclass";
  const courseSize = 19;
  const courseWidth = montserratBold.widthOfTextAtSize(courseTitle, courseSize);
  page.drawText(courseTitle, {
    x: width / 2 - courseWidth / 2,
    y: nameY - 58,
    size: courseSize,
    font: montserratBold,
    color: rgb(0.29, 0.23, 1.0), // #4A3AFF
  });

  // Verification & Date line
  const dateStr = "Issued on Sep 14, 2026 • Verified Credential ID: EDU-PY-84920";
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
  const sealBytes = fs.readFileSync(path.join(publicDir, "cert_gold_seal.jpg"));
  const sealImg = await pdfDoc.embedJpg(sealBytes);
  const sealSize = 90;
  const sealX = 85;
  const sealY = 60;

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

  // Signee Title
  const sigTitle = "Founder & Lead Instructor, EduConnect";
  const sigTitleSize = 8.5;
  page.drawText(sigTitle, {
    x: sigX,
    y: sigY - 22,
    size: sigTitleSize,
    font: montserratMedium,
    color: rgb(0.45, 0.5, 0.6),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, "..", "public", "test_cert_output.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("PDF generated successfully at:", outputPath);
}

generateCertificate().catch(console.error);
