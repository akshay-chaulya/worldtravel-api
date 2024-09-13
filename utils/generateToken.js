import jwt from "jsonwebtoken";
import { jwtPass, JWTTokenExpireAt } from "../config/index.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtPass, {
    expiresIn: JWTTokenExpireAt,
  });
};

export default generateToken;
