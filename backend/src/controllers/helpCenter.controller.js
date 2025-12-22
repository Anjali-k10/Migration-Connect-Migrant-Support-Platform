import HelpCenter from "../models/HelpCenter.js";

export const addHelpCenter = async (req, res) => {
  try {
    const {
      name,
      type,
      city,
      address,
      contactNumber,
      costPerDay
    } = req.body;

    if (!name || !type || !city || !address || !contactNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const center = new HelpCenter({
      name,
      type,
      city,
      address,
      contactNumber,
      costPerDay
    });

    await center.save();

    res.status(201).json({
      message: "Help center added successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const listHelpCenters = async (req, res) => {
  try {
    const { city, type } = req.query;

    const query = { isActive: true };

    if (city) query.city = city;
    if (type) query.type = type;

    const centers = await HelpCenter.find(query);

    res.json(centers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
