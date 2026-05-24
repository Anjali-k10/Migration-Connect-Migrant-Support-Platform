import EmergencyRequest from "../models/EmergencyRequest.js";

export const cleanupResolvedEmergencies = async () => {
  const hours = 24;
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);

  try {
    const result = await EmergencyRequest.deleteMany({
      status: "resolved",
      resolvedAt: { $lte: cutoffTime }
    });

    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} resolved emergencies`);
    }
  } catch (err) {
    console.error("Cleanup error:", err.message);
  }
};
