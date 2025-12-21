import Migrant from '../models/Migrant.js';
import crypto from 'crypto';

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
      emergencyContact
    } = req.body;

    if (!idNumber) {
      return res.status(400).json({ error: 'ID number required' });
    }

    const idHash = crypto
      .createHash('sha256')
      .update(idNumber)
      .digest('hex');

    
    const existingMigrant = await Migrant.findOne({ idHash });
    if (existingMigrant) {
      return res.status(409).json({
        error: 'Migrant already registered'
      });
    }
   

    const migrantId = 'MIG-' + Date.now() + Math.floor(Math.random() * 1000);

    const migrant = new Migrant({
      migrantId,
      name,
      dateOfBirth,
      homeState,
      currentCity,
      occupation,
      idType,
      idHash,
      emergencyContact,
      verified: false
    });

    await migrant.save();

    res.status(201).json({
      message: 'Migrant registered successfully',
      migrantId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
};

export const getMigrantById = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOne({ migrantId });

    if (!migrant) {
      return res.status(404).json({ error: 'Migrant not found' });
    }

    res.json({
      migrantId: migrant.migrantId,
      name: migrant.name,
      dateOfBirth: migrant.dateOfBirth,
      homeState: migrant.homeState,
      currentCity: migrant.currentCity,
      occupation: migrant.occupation,
      verified: migrant.verified,
      emergencyContact: migrant.emergencyContact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateMigrant = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOne({ migrantId });
    if (!migrant) {
      return res.status(404).json({ error: 'Migrant not found' });
    }

    const { name, currentCity, occupation, emergencyContact } = req.body;

    if (name) migrant.name = name;
    if (currentCity) migrant.currentCity = currentCity;
    if (occupation) migrant.occupation = occupation;
    if (emergencyContact) migrant.emergencyContact = emergencyContact;

    await migrant.save();

    res.json({ message: 'Migrant details updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteMigrant = async (req, res) => {
  try {
    const { migrantId } = req.params;

    const migrant = await Migrant.findOneAndDelete({ migrantId });

    if (!migrant) {
      return res.status(404).json({ error: 'Migrant not found' });
    }

    res.json({ message: 'Migrant record deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
