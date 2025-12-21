import mongoose from 'mongoose';

const migrantSchema = new mongoose.Schema({
	migrantId: { type: String, required: true, unique: true },
	name: { type: String, required: true,trim: true  },
	dateOfBirth: { type: Date, required: true },
	homeState: { type: String, required: true,trim: true },
	currentCity: { type: String, required: true,trim: true },
	idType: { type: String, enum: ['Aadhaar', 'VoterID', 'WorkerID'], required: true },
	idHash: { type: String, required: true },
	emergencyContact: { type: String, required: true },
	verified: { type: Boolean, default: false }
}, { timestamps: true });

const Migrant = mongoose.model('Migrant', migrantSchema);
export default Migrant;
