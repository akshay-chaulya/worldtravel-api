// cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "../config/index.js";
import { optimizeImage } from "../utils/index.js";

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

const uploadFile = async (filePath) => {
  if (!filePath) return null;
  const optimizeImagePath = optimizeImage(filePath);
  try {
    const response = await cloudinary.uploader.upload(optimizeImagePath, {
      folder: "worldtravel_app_users_logos", // Save the image in a 'logos' folder
      timeout: 12 * 10000,
    });
    console.log(response);
    return response.secure_url;
  } catch (err) {
    console.error("Error uploading file:", err);
    return null;
  } finally {
    try {
      fs.unlinkSync(filePath); // Delete the original file
      fs.unlinkSync(`${filePath}-optimized.jpg`); // Delete the optimized file
    } catch (deleteError) {
      console.error("Error deleting file:", deleteError);
    }
  }
};

export default uploadFile;
