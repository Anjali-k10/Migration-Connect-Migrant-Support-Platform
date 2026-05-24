import Migrant from "../models/Migrant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { migrantCookieOptions } from "../config/cookies.js";

export const migrantLogin = async (req, res) => {
  try {
    const { migrantId, password } = req.body;

    if (!migrantId || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const migrant = await Migrant.findOne({ migrantId });
    if (!migrant) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, migrant.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { migrantId: migrant.migrantId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("migrant_token", token, migrantCookieOptions);

    res.json({
      message: "Login successful",
      migrantId: migrant.migrantId,
      verified: migrant.verified
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const migrantLogout = (req, res) => {
  res.clearCookie("migrant_token", migrantCookieOptions);

  res.json({ message: "Logged out successfully" });
};
