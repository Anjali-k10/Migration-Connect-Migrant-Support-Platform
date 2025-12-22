import HelpCenter from "../models/HelpCenter.js";
import { getDistance } from "../utils/distanceCalculator.js";


export const addHelpCenter = async (req, res) => {
  try {
    const {
      name,
      type,
      city,
      address,
      contactNumber,
      costPerDay,
      location
    } = req.body;

    if (!name || !type || !city || !address || !contactNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!location || location.lat == null || location.lng == null) {
      return res.status(400).json({ error: "Location required" });
    }

    const center = new HelpCenter({
      name,
      type,
      city,
      address,
      contactNumber,
      costPerDay,
      location
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

/**
 * List help centers by city and type
 */
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


export const getCheapestShelters = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const shelters = await HelpCenter.find({
      city,
      type: "shelter",
      isActive: true
    }).sort({ costPerDay: 1 });

    res.json(shelters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const getNearestHelpCenters = async (req, res) => {
  try {
    const { lat, lng, type } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: "Latitude and longitude required"
      });
    }

    const query = { isActive: true };
    if (type) query.type = type;

    const centers = await HelpCenter.find(query);

    const results = centers.map((center) => {
      const distance = getDistance(
        Number(lat),
        Number(lng),
        center.location.lat,
        center.location.lng
      );

      return {
        ...center.toObject(),
        distance
      };
    });

    results.sort((a, b) => a.distance - b.distance);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
