const express = require("express");
const router = express.Router();
const {
  getPatients,
  postPatientsById,
  postPatientsByNric,
  putPatients,
  deletePatients,
  patchPatients,
  seedData,
} = require("../controllers/patients");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/patients", getPatients);
router.post("/patients/id", postPatientsById);
router.post("/patients/nric", postPatientsByNric);

router.put(
  "/patients",
  [
    check("patient_firstName", "First name is required").not().isEmpty(),
    check("patient_lastName", "Last Name is required").not().isEmpty(),
    check("patient_nric", "NRIC must be exactly 9 characters long").isLength({
      min: 9,
      max: 9,
    }),
  ],
  putPatients
);
router.delete("/patients", deletePatients);
router.patch("/patients/:id", patchPatients);
router.get("/seed", seedData);

module.exports = router;
