import { Request, Response } from "express";
import app from "../src/app";

// Enable proper handling of serverless environment
app.disable("x-powered-by");

// Handle all HTTP methods for your API
const handler = async (req: Request, res: Response) => {
  try {
    await app(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
