const express = require("express");
const router = express.Router();
const {
  getStaff,
  postStaffByNric,
  postStaffById,
  putStaff,
  deleteStaff,
  patchStaff,
} = require("../controllers/staff");
const auth = require("../middleware/auth");
const { validateInsertStaffData } = require("../validators/staff");

router.get("/staff", getStaff);
router.post("/staff/nric", postStaffByNric);
router.post("/staff/id", postStaffById);
router.put(
  "/staff",
  validateInsertStaffData,

  putStaff
);
router.delete("/staff", deleteStaff);
router.patch("/staff/:id", patchStaff);

module.exports = router;

//   [
//     check("staff_firstName", "First name is required").not().isEmpty(),
//     check("staff_lastName", "Last Name is required").not().isEmpty(),
//     check("staff_nric", "NRIC must be exactly 9 characters long").isLength({
//       min: 9,
//       max: 9,
//     }),
//     check("staff_hospitalId", "Staff hospital Id is required").not().isEmpty(),
//     check(
//       "staff_hospitalId",
//       "Staff hospital Id must be exactly 8 characters long"
//     ).isLength({
//       min: 8,
//       max: 8,
//     }),
//   ],
