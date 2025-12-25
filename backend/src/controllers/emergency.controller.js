import EmergencyRequest from "../models/EmergencyRequest.js";
import Migrant from "../models/Migrant.js";

export const createEmergency = async (req, res) => {
  try {
    const migrantId = req.migrant.migrantId;
    const { currentCity, message } = req.body;

    if (!currentCity || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const migrant = await Migrant.findOne({ migrantId });
    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    if (!migrant.verified) {
      return res.status(403).json({
        error: "Only verified migrants can create emergency requests"
      });
    }

    const emergency = new EmergencyRequest({
      migrantId,
      currentCity,
      message
    });

    await emergency.save();

    res.status(201).json({
      message: "Emergency request created",
      emergencyId: emergency._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resolveEmergency = async (req, res) => {
  try {
    const { id } = req.params;

    const emergency = await EmergencyRequest.findById(id);
    if (!emergency) {
      return res.status(404).json({ error: "Emergency not found" });
    }

    emergency.status = "resolved";
    emergency.resolvedAt = new Date();

    await emergency.save();

    res.json({ message: "Emergency marked as resolved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listEmergencies = async (req, res) => {
  try {
    const emergencies = await EmergencyRequest.find({ status: "pending" })
      .sort({ createdAt: -1 });

    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

