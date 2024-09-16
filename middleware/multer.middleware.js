import multer from "multer";

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "public/images");
  //   },
  //   filename: function (req, file, cb) {
  //     console.log(file);
  //     cb(null, Date.now() + "-" + file.originalname);
  //   },
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Please upload an image file."), false); // Reject the file
  }
};

const singleUpload = multer({ storage, fileFilter }).single("avatarUrl");

export default singleUpload;
