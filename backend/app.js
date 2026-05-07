import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routers.js";
import authRouter from "./routes/auth.routers.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
import passport from "./config/passport.js";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL 
        : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(passport.initialize());

// Global connection cache — prevents race conditions during cold starts
let connectionPromise = null;

const ensureDbConnected = async () => {
  if (!connectionPromise) {
    connectionPromise = connectToDatabase()
      .then(() => { console.log('MongoDB connected (cached)'); })
      .catch((err) => {
        connectionPromise = null; // reset on failure so retry is possible
        throw err;
      });
  }
  return connectionPromise;
};

app.use(async (req, res, next) => {
  try {
    await ensureDbConnected();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/workflow", workflowRouter);
app.use(errorMiddleware);

app.get("/api/v1", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/api/v1/health", (req, res) => res.status(200).json({ status: "ok" }));

export default app;
