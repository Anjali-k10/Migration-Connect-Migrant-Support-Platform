import Migrant from "../models/Migrant.js";

const checkVerifiedMigrant = async (req, res, next) => {
  try {
    const migrantId = req.migrant?.migrantId;

    if (!migrantId) {
      return res.status(401).json({ error: "Authentication required" });
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
