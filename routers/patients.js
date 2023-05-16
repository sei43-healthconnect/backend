const express = require("express");
const router = express.Router();
const {
  getPatients,
  postPatientById,
  postPatientByNric,
  postPatientsByWard,
  putPatients,
  deletePatients,
  patchPatients,
} = require("../controllers/patients");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/patients", getPatients);
router.post("/patients/nric", postPatientByNric);
router.post("/patients/id", postPatientById);
router.post("/patients/ward", postPatientsByWard);

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

module.exports = router;
