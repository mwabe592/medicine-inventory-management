import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    // Check if the refresh token is valid
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    // Find the user by the refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify the refresh token
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    if (!secretKey) {
      throw new Error("Missing REFRESH_TOKEN_SECRET environment variable");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, secretKey);
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Ensure the decoded payload contains necessary fields
    if (!decoded || !decoded.userId || !decoded.username) {
      return res
        .status(400)
        .json({ message: "Invalid token payload: Missing userId or username" });
    }

    // Generate a new access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
      throw new Error("Missing ACCESS_TOKEN_SECRET environment variable");
    }

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error: any) {
    console.error("Error refreshing access token:", error.message);
    return res.status(500).json({
      message: "An error occurred while refreshing the access token",
      error: error.message,
    });
  }
};
