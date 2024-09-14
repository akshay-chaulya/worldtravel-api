import cors from "cors";
import express from "express";
import multer from "multer";
import { port } from "./config/index.js";
import { connectDB } from "./db/index.js";
import mainRouter from "./routes/index.js";

// const corsOptions = {
//   origin: ["https://worldtravel1.netlify.app", "http://localhost:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

const allowedOrigins = ["https://worldtravel1.netlify.app", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Content-Type"],
};

const app = express();

// CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/v1", mainRouter);

// Handle preflight requests if necessary
app.options("*", cors(corsOptions));

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
    res
      .status(400)
      .json({ success: false, message: `Multer error: ${err.message}` });
  } else if (
    err.message === "Invalid file type. Please upload an image file."
  ) {
    res.status(400).json({ success: false, message: err.message });
  } else {
    console.error(err.stack); // Log the error for debugging
    res
      .status(500)
      .json({ success: false, message: "An unknown error occurred." });
  }
});

app.listen(port, async () => {
  console.log("Server is running at port " + port);
  await connectDB();
});
