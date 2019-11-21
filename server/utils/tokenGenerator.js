import jwt from "jsonwebtoken";

export const generateAuthToken = email => {
  const token = jwt.sign(
    {
      email
    },
    process.env.JWT_SECRET,
    { expiresIn: "2hr" }
  );
  return token;
};
