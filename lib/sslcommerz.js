// SSLCommerz payment integration helper
export const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";

export const SSLCOMMERZ_BASE_URL = isLive
  ? "https://securepay.sslcommerz.com"
  : "https://sandbox.sslcommerz.com";

export const STORE_ID = process.env.SSLCOMMERZ_STORE_ID || "testbox";
export const STORE_PASS = process.env.SSLCOMMERZ_STORE_PASS || "qwerty";

// USD to BDT conversion rate for local payments
export const USD_TO_BDT_RATE = 120;

export function convertUsdToBdt(usdAmount) {
  const numeric = parseFloat(usdAmount) || 0;
  return Math.round(numeric * USD_TO_BDT_RATE);
}

/**
 * Initialize SSLCommerz Payment Session
 */
export async function initSSLCommerzSession({
  amount,
  tran_id,
  courseId,
  userId,
  courseTitle = "EduPlus Course",
  customerName = "Student",
  customerEmail = "student@eduplus.com",
  origin = "http://localhost:3000",
}) {
  const initUrl = `${SSLCOMMERZ_BASE_URL}/gwprocess/v4/api.php`;

  // Callback URLs (must be absolute URLs)
  const success_url = `${origin}/api/sslcommerz/success`;
  const fail_url = `${origin}/api/sslcommerz/fail`;
  const cancel_url = `${origin}/api/sslcommerz/cancel`;
  const ipn_url = `${origin}/api/sslcommerz/ipn`;

  const payload = new URLSearchParams({
    store_id: STORE_ID,
    store_passwd: STORE_PASS,
    total_amount: amount.toString(),
    currency: "BDT",
    tran_id: tran_id,
    success_url,
    fail_url,
    cancel_url,
    ipn_url,
    // Custom metadata to correlate transaction back to user and course
    value_a: courseId,
    value_b: userId,
    value_c: "eduplus",
    value_d: origin,

    // Product info
    product_name: courseTitle.slice(0, 100),
    product_category: "E-Learning",
    product_profile: "non-physical-goods",

    // Customer info
    cus_name: customerName.trim() || "Student",
    cus_email: customerEmail.trim() || "student@eduplus.com",
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
    shipping_method: "NO",
  });

  try {
    const res = await fetch(initUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("SSLCommerz Init Error:", error);
    throw new Error(`SSLCommerz init failed: ${error.message}`);
  }
}

/**
 * Validate payment with SSLCommerz Validation API
 */
export async function validateSSLCommerzPayment(val_id) {
  if (!val_id) return { status: "INVALID" };

  const validateUrl = `${SSLCOMMERZ_BASE_URL}/validator/api/validationserverAPI.php?val_id=${encodeURIComponent(
    val_id
  )}&store_id=${encodeURIComponent(STORE_ID)}&store_passwd=${encodeURIComponent(
    STORE_PASS
  )}&v=1&format=json`;

  try {
    const res = await fetch(validateUrl, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("SSLCommerz Validation Error:", error);
    return { status: "ERROR", message: error.message };
  }
}
