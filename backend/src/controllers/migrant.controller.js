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
		const idHash = crypto.createHash('sha256').update(idNumber).digest('hex');
		const migrantId = 'MIG-' + Date.now();

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
