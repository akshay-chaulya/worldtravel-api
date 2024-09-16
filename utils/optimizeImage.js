import sharp from "sharp";

const optimizeImage = async (filePath) => {
  const optimizedPath = `${filePath}-optimized.jpg`;
  await sharp(filePath)
    .resize(200, 200) // Resize the image to 200x200 before upload
    .jpeg({ quality: 80 }) // Adjust the quality
    .toFile(optimizedPath);
  return optimizedPath;
};

export default optimizeImage;
