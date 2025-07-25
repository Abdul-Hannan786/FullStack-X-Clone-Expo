import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      default: null,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      default: null,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notifications", notificationSchema);
export default Notification;
