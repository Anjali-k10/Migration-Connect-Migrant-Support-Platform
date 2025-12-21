import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    migrantId: {
      type: String,
      required: true
    },

    currentCity: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending"
    },

    resolvedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const EmergencyRequest = mongoose.model("EmergencyRequest", emergencySchema);
export default EmergencyRequest;

