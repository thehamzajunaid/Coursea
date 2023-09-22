import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    // teacherName: {
    //   type: String,
    //   required: true,
    // },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: false,
    },
    shortDesc: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", CourseSchema);
