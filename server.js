import cors from "cors";
import express from "express";
import multer from "multer";
import { port } from "./config/index.js";
import { connectDB } from "./db/index.js";
import mainRouter from "./routes/index.js";

const app = express();
// https://worldtravel1.netlify.app
app.use(cors({origin: "https://worldtravel1.netlify.app"}));
app.use(express.json());
app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.json({ message: "working" });
});

// Handle 404 errors (undefined routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});


// Universal error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer-specific errors
    res
      .status(400)
      .json({ success: false, message: `Multer error: ${err.message}` });
  } else if (
    err.message === "Invalid file type. Please upload an image file."
  ) {
    // Handle invalid file type errors
    res.status(400).json({ success: false, message: err.message });
  } else {
    // Handle all other errors
    res
      .status(500)
      .json({ success: false, message: "An unknown error occurred." });
  }
});

app.listen(port, async () => {
  console.log("server is runing at port " + port);
  await connectDB();
});
