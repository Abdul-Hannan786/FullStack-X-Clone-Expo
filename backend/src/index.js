import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comments.route.js";
import notificationRoutes from "./routes/notification.route.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware);
app.use(arcjetMiddleware);

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`⚙️  Server is running at port : ${ENV.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
