import "dotenv/config";
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const jwtPass = process.env.JWT_PASS;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
const mailtrapEndpoint = process.env.MAILTRAP_ENDPOINT;
const mailtrapToken = process.env.MAILTRAP_TOKEN;
const clientUrl = process.env.CLIENT_URL;
const passForSendEmail = process.env.MY_EMAIL_APP_PASSWORD;
const verificationTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000; // in 24 hours
const resetPasswordTokenExpireAt = Date.now() + 10 * 60 * 1000; // in 10 minutes
const JWTTokenExpireAt = "7d";

export {
  port,
  dbUrl,
  jwtPass,
  cloudinaryCloudName,
  cloudinaryApiSecret,
  cloudinaryApiKey,
  mailtrapEndpoint,
  mailtrapToken,
  clientUrl,
  passForSendEmail,
  verificationTokenExpireAt,
  resetPasswordTokenExpireAt,
  JWTTokenExpireAt,
};
