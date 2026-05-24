import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // store token in cookie (2 hours)
    res.cookie("admin_token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: "strict"
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAdminPassword = async (req, res) => {
  try {
    const adminId = req.admin.adminId;

    const oldPassword = req.body.oldPassword?.trim();
    const newPassword = req.body.newPassword?.trim();

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        error: "New password must be different from old password"
      });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const match = await bcrypt.compare(oldPassword, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Old password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;

    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
