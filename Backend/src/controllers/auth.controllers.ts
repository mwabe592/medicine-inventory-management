import { Request, Response } from "express";
import * as authServices from "../services/auth.service";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, userName, password } = req.body;

  if (!name || !userName || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const registeredUser = await authServices.register(req.body);
    res.status(200).json({
      message: "Your user has been successfully registered",
      registeredUser,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.body.userName || !req.body.password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const { accessToken, refreshToken } = await authServices.login(req.body);
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Protect from JavaScript access
      secure: false, // Use `true` only with HTTPS
      sameSite: "lax", // Prevent CSRF but allow cross-origin navigation
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 30),
    }); // Expires in 30 days

    res.status(200).json({
      message: "Your account has been successfully logged in",
      refreshToken, // Optional to send refresh token in response
      accessToken,
    });
  } catch (error) {
    const e = error as Error;
    if (e.message === "User not found") {
      res.status(404).json({ error: "User not found" });
      return;
    }
    if (e.message === "Incorrect Password") {
      res.status(401).json({ error: "Incorrect Password" });
      return;
    }

    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "You have been successfully logged out" });
};
