// cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
} from "../config/index.js";

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

const uploadFile = async (filePath) => {
  if (!filePath) return null;
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: 'worldtravel_app_users_logos', // Save the image in a 'logos' folder
      transformation: [
        { width: 200, height: 200, crop: 'fit' }, // Adjust size to a typical logo size
        { quality: 'auto' }, // Automatically adjust quality
        { fetch_format: 'png' } // Save as PNG format
      ],
    })
    return response.secure_url;
  } catch (err) {
    return null;
  } finally {
    fs.unlinkSync(filePath);
  }
};

export default uploadFile;
