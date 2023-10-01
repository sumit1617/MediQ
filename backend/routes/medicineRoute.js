const express = require("express");

const {
  createMedicine,
  getAllMedicines,
  getMedicineDetails,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineControllers");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/medicine/new/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("superAdmin", "admin"),
    createMedicine
  );

router.route("/medicines/:id").get(getAllMedicines);

router
  .route("/medicine/:id")
  .get(getMedicineDetails)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "superAdmin"),
    deleteMedicine
  );

router.route("/admin/medicine/update/:id").put(isAuthenticatedUser, authorizeRoles("admin", "superAdmin"), updateMedicine);

module.exports = router;
