const mongoose = require("mongoose");

const PatientsSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    gender: { type: String, require: true },
    nric: { type: String, require: true },
    phoneNumber: { type: Number, require: true },
    patient_dateOfBirth: { type: Date, require: true },
    patient_dateAdmitted: { type: Date, require: true },
    patient_diet: { type: String, require: true },
    patient_language: { type: String, require: false },
    patient_attention: { type: String, require: false },
    patient_doctorRemark: { type: String, require: false },
    patient_photo: { type: String, require: false },
    patient_ward: { type: Number, require: true },
    patient_bed: { type: Number, require: true },
  },
  { collection: "patients" }
);

module.exports = mongoose.model("Patients", PatientsSchema);
