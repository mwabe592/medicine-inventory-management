import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });

  // Find the user by the refresh token
  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  // Verify the refresh token (optional: hash and compare if stored hashed)
  try {
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Missing REFRESH_SECRET_KEY environment variable");
    }
    const decoded = jwt.verify(refreshToken, secretKey);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
