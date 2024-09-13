import jwt from "jsonwebtoken";
import { jwtPass } from "../config/index.js";
import { User } from "../models/index.js";
import errorHandler from "../utils/errorHandler.js";

const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw {
        status: 401,
        message: "Unautorized - no token provided or token not valid",
      };
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, jwtPass);
    if (!decoded?.id)
      throw {
        message: "Authentication problem. Inside token have't any id",
        status: 403,
      };

    const user = await User.findById(decoded.id);

    if (!user.status) {
      throw { status: 403, message: "Your account has been blocked." };
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    errorHandler(res, error);
  }
};

export default verifyAuth;
