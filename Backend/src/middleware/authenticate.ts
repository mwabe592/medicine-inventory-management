import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Make sure it doesn't return anything
  // Check if the authorization header exists and contains a token

  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({ message: "Access token not found in cookies" });
    return;
  }

  // Verify the token
  try {
    const secretKey = process.env.ACCESS_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Missing SECRET_KEY environment variable");
    }

    const decodedToken = jwt.verify(token, secretKey);
    res.locals.user = decodedToken; // Attach the user to the request object for use in other routes
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res
      .status(401)
      .json({ message: "There was a problem with verifying your token" });
    return;
  }
};
