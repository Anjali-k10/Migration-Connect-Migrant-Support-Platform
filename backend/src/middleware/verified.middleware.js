import Migrant from "../models/Migrant.js";

const checkVerifiedMigrant = async (req, res, next) => {
  try {
    const { migrantId } = req.body;

    if (!migrantId) {
      return res.status(400).json({ error: "Migrant ID required" });
    }

    const migrant = await Migrant.findOne({ migrantId });

    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    if (!migrant.verified) {
      return res.status(403).json({
        error: "Migrant not verified"
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default checkVerifiedMigrant;
