import bcrypt from "bcrypt";

export default async function  generateHashPassword(password) {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}