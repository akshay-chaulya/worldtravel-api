import cors from "cors";
import express from "express";
import multer from "multer";
import { port } from "./config/index.js";
import { connectDB } from "./db/index.js";
import mainRouter from "./routes/index.js";

// const corsOptions = {
//   origin: ["https://worldtravel1.netlify.app", "http://localhost:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
//   credentials: true, // Allow credentials if needed
// };

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["https://worldtravel1.netlify.app", "http://localhost:5173"]

    // Allow requests with no 'origin' (e.g., mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers you expect to send
};


const app = express();

// CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests if necessary
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/api/v1", mainRouter);

// Handle 404 errors (undefined routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

// Universal error handler
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res
      .status(403)
      .json({ success: false, message: "CORS Error: " + err.message });
  } else if (err instanceof multer.MulterError) {
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
