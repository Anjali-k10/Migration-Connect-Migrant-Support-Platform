import Migrant from "../models/Migrant.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";


export const registerMigrant = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      homeState,
      currentCity,
      occupation,
      idType,
      idNumber,
      password,
      emergencyContact
    } = req.body;

    if (!idNumber || !password) {
      return res.status(400).json({ error: "ID number and password required" });
    }

    const idHash = crypto
      .createHash("sha256")
      .update(idNumber)
      .digest("hex");

    const existingMigrant = await Migrant.findOne({ idHash });
    if (existingMigrant) {
      return res.status(409).json({ error: "Migrant already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const migrantId = "MIG-" + Date.now() + Math.floor(Math.random() * 1000);

    const migrant = new Migrant({
      migrantId,
      name,
      dateOfBirth,
      homeState,
      currentCity,
      occupation,
      idType,
      idHash,
      password: hashedPassword,
      emergencyContact,
      verified: false
    });

    await migrant.save();

    res.status(201).json({
      message: "Migrant registered successfully",
      migrantId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getMigrantById = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOne({ migrantId }).select(
      "-password -idHash"
    );

    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    res.json(migrant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateMigrant = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOne({ migrantId });
    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    const { name, currentCity, occupation, emergencyContact } = req.body;

    if (name) migrant.name = name;
    if (currentCity) migrant.currentCity = currentCity;
    if (occupation) migrant.occupation = occupation;
    if (emergencyContact) migrant.emergencyContact = emergencyContact;

    await migrant.save();

    res.json({ message: "Migrant details updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteMigrant = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOneAndDelete({ migrantId });

    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    res.json({ message: "Migrant record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const verifyMigrant = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOne({ migrantId });
    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    if (migrant.verified) {
      return res.json({ message: "Migrant already verified" });
    }

    migrant.verified = true;
    await migrant.save();

    res.json({ message: "Migrant verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listMigrants = async (req, res) => {
  try {
    const migrants = await Migrant.find().select("-password -idHash -__v");
    res.json(migrants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    const migrantId = req.migrant.migrantId;

    const migrant = await Migrant.findOne({ migrantId }).select(
      "-password -idHash"
    );

    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    res.json(migrant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const migrantId = req.migrant.migrantId;

    const migrant = await Migrant.findOne({ migrantId });
    if (!migrant) {
      return res.status(404).json({ error: "Migrant not found" });
    }

    const { currentCity, occupation, emergencyContact } = req.body;

    if (currentCity) migrant.currentCity = currentCity;
    if (occupation) migrant.occupation = occupation;
    if (emergencyContact) migrant.emergencyContact = emergencyContact;

    await migrant.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

