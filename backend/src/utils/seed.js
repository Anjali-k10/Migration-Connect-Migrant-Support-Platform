import HelpCenter from "../models/HelpCenter.js";

const sampleCenters = [
  {
    name: "Community Food Kitchen",
    type: "food",
    city: "Mumbai",
    address: "12 Relief Lane, Dharavi",
    contactNumber: "+91-9876543210",
    costPerDay: 50,
    location: { lat: 19.0176, lng: 72.8562 }
  },
  {
    name: "Safe Haven Shelter",
    type: "shelter",
    city: "Mumbai",
    address: "45 Hope Street, Bandra",
    contactNumber: "+91-9876543211",
    costPerDay: 120,
    location: { lat: 19.0596, lng: 72.8295 }
  },
  {
    name: "Migrant Support NGO",
    type: "ngo",
    city: "Delhi",
    address: "88 Unity Road, Karol Bagh",
    contactNumber: "+91-9876543212",
    costPerDay: 0,
    location: { lat: 28.6519, lng: 77.1909 }
  }
];

export const seedDatabase = async () => {
  const count = await HelpCenter.countDocuments();
  if (count > 0) return;

  await HelpCenter.insertMany(sampleCenters);
  console.log("Seeded sample help centers");
};
