import mongoose from "mongoose";

const { Schema } = mongoose;
const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      maxLength: 280,
    },
    image: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
