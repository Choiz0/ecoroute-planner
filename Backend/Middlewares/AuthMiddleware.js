import User from "../models/UserModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./.env" });

// export const userVerification = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false });
//   }
//   // eslint-disable-next-line no-undef
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.id);
//       if (user) return res.json({ status: true, user: user.username });
//       else return res.json({ status: false });
//     }
//   });
// };
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
    if (err) return res.sendStatus(403);
    req.user = decodedToken; // // save user info to req.user
    next();
  });
};
