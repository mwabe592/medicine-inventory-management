import express, { Application, response } from "express";
import medRouter from "./routes/medication.routes";
import authRouter from "./routes/auth.routes";
import connectDB from "./config/database";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();

// Connect to MongoDB (will only connect once)
connectDB().catch(console.error);

//cors Congfig
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies and authorization headers
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/medication", medRouter);
app.use("/auth", authRouter);

export default app;
