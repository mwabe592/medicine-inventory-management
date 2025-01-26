import jwt from "jsonwebtoken";

export const generateTokens = (id: string) => {
  const secretKey = process.env.ACCESS_SECRET_KEY;
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
  const payload = { id };
  //look at adding in roles and other user data in the payload

  if (!secretKey) {
    throw new Error("Missing SECRET_KEY environment variable");
  }
  if (!refreshSecretKey) {
    throw new Error("Missing REFRESH_SECRET_KEY environment variable");
  }
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};
