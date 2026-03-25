import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userid);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized", error });
    next(error);
  }
};

const loggedInAsAdmin = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not signed in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const yesAdmin = decoded.role === "admin";

    if (!yesAdmin) {
      return res.status(401).json({ decoded });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Internal server error" });
  }
};
export { authorize };
export { loggedInAsAdmin };
