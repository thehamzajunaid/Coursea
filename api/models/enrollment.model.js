import mongoose from "mongoose";
const { Schema } = mongoose;

const EnrollmentSchema = new Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    paymentComplete: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Enrollment", EnrollmentSchema);