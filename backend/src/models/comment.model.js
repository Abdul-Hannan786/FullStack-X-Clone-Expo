import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxLength: 280,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", commentSchema);
export default Comment;
