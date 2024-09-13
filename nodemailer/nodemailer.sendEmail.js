import transporter from "./nodemailer.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOM_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  CONTACT_US_EMAIL_TEMPLATE,
} from "./nodemailer.emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    to: email,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
  };

  try {
    const { messageId } = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", messageId);
  } catch (err) {
    console.log("Error sending verification email: " + err);
    throw new Error("Error sending verification email: " + err);
  }
};

export const sendWelcomeEmail = async (email, name, url = "#") => {
  const mailOptions = {
    to: email,
    subject: "Welcome to Worldtravel",
    html: WELCOM_EMAIL_TEMPLATE.replace("{userName}", name)
      .replace("{email}", email)
      .replace("{siteLink}", url),
  };

  try {
    const { messageId } = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", messageId);
  } catch (err) {
    console.log("Error sending welcome email: " + err);
    throw new Error("Error sending welcome email: " + err);
  }
};

export const sendResetPasswordEmail = async (email, url) => {
  const mailOptions = {
    to: email,
    subject: "Reset your password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
  };

  try {
    const { messageId } = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", messageId);
  } catch (err) {
    console.log("Error sending reset password email: " + err);
    throw new Error("Error sending reset password email: " + err);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    to: email,
    subject: "Password reset successfully",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    const { messageId } = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", messageId);
  } catch (err) {
    console.log("Error sending reset successful email: " + err);
    throw new Error("Error sending reset successful email: " + err);
  }
};

export const contactUsEmail = async (adimns, { email, name, message }) => {
  try {
    await Promise.all(
      adimns.map(async ({ email: adminEmail }) => {
        const mailOptions = {
          to: adminEmail,
          subject: "Contact us message",
          html: CONTACT_US_EMAIL_TEMPLATE.replaceAll("{{userName}}", name)
            .replace("{{userEmail}}", email)
            .replace("{{userMessage}}", message),
        };
        const { messageId } = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", messageId);
      })
    );
    console.log("all email sent successfully to the admins");
  } catch (err) {
    console.log("Error sending reset successful email: " + err);
    throw new Error("Error sending reset successful email: " + err);
  }
};
