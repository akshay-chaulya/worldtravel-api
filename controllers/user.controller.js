import errorHandler from "../utils/errorHandler.js";
import responseHandler from "../utils/responseHandler.js";
import { userMessageInputsValidate } from "../validation/index.js";
import { User, UserMessage } from "../models/index.js";
import { contactUsEmail } from "../nodemailer/nodemailer.sendEmail.js";

export const contactUs = async (req, res) => {
  try {
    const { success, error } = userMessageInputsValidate.safeParse(req.body);

    if (!success)
      throw { message: "Invalide credentials.", status: 411, error };

    const { email, name, message } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) {
      throw { message: "This email address is not registered.", status: 403 };
    }

    const messagesByThisUser = await UserMessage.countDocuments({ email });

    if (messagesByThisUser >= 4) {
      const admins = await User.find({ userRole: "admin" });
      // send the email to the worldtravel team
      await contactUsEmail(admins, req.body);
    }

    const userMessage = await UserMessage.create({ email, name, message });

    if (!userMessage) {
      throw {
        message:
          "For some server issue, the message can't be sent. Try again later.",
        status: 500,
      };
    }

    return responseHandler(res, {
      message: "Message sent successfully.",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
