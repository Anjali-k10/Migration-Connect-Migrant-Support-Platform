import mongoose from "mongoose";

const helpCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["food", "shelter", "ngo"],
      required: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true
    },

    contactNumber: {
      type: String,
      required: true
    },

    costPerDay: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const HelpCenter = mongoose.model("HelpCenter", helpCenterSchema);
export default HelpCenter;

