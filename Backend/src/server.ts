import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database";
import app from "./app";

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
