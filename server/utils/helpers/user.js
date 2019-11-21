import jwt from "jsonwebtoken";

// Decode token and return current user object.
export const getCurrentUser = async req => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.trim().length === 0
  ) {
    return false;
  }
  const token = await req.headers.authorization.split(" ")[1];

  try {
    if (token) {
      const decodeData = jwt.verify(token, process.env.JWT_SECRET);
      return decodeData;
    }
  } catch (err) {
    return false;
  }
};
