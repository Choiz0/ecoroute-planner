import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./.env" });

// export const createSecretToken = (id) => {
//   // eslint-disable-next-line no-undef
//   return jwt.sign({ id }, process.env.TOKEN_KEY, {
//     expiresIn: 3 * 24 * 60 * 60,
//   });
// };
export const createSecretToken = (user) => {
  const payload = {
    id: user._id, // 사용자 ID
    username: user.username, // 사용자 이름
    email: user.email, // 사용자 이메일
  };
  // eslint-disable-next-line no-undef
  return jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
