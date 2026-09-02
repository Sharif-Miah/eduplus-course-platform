const isObjectId = (value) => {
  if (!value) return false;
  return (
    value._bsontype === "ObjectID" ||
    value._bsontype === "ObjectId" ||
    typeof value.toHexString === "function" ||
    (typeof value === "object" &&
      value.constructor &&
      value.constructor.name === "ObjectId") ||
    (typeof value === "object" &&
      value.buffer &&
      (Array.isArray(value.buffer) || Buffer.isBuffer(value.buffer)))
  );
};

export const sanitizeMongoData = (data) => {
  if (data === null || data === undefined) return data;

  // Primitive types
  if (typeof data !== "object") {
    return data;
  }

  // Handle Date
  if (data instanceof Date) {
    return data.toISOString();
  }

  // Handle MongoDB ObjectId
  if (isObjectId(data)) {
    return data.toString();
  }

  // Handle Buffer
  if (Buffer.isBuffer(data)) {
    return data.toString("hex");
  }

  // Handle Array
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeMongoData(item));
  }

  // Handle Mongoose Document / Plain Object
  const raw = typeof data.toObject === "function" ? data.toObject() : data;
  const sanitized = {};

  if (raw._id !== undefined && raw._id !== null) {
    const strId = raw._id.toString();
    sanitized.id = strId;
    sanitized._id = strId;
  } else if (raw.id !== undefined && raw.id !== null) {
    const strId = raw.id.toString();
    sanitized.id = strId;
  }

  for (const [key, value] of Object.entries(raw)) {
    if (key === "_id") {
      continue;
    }
    sanitized[key] = sanitizeMongoData(value);
  }

  return sanitized;
};

export const replaceMongoIdInArray = (array) => {
  if (!Array.isArray(array)) return [];
  return array.map((item) => sanitizeMongoData(item));
};

export const replaceMongoIdInObject = (obj) => {
  if (!obj || typeof obj !== "object") return null;
  return sanitizeMongoData(obj);
};

export const getSlug = (title) => {
  if (!title) return null;

  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return slug;
};