const express = require("express");
const {
  createStore,
  getAllStores,
  getAdminStores,
  getStoreDetails,
} = require("../controllers/storeControllers");

const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();


router.route("/stores").get(getAllStores);

router.route("/superAdmin/stores").get(isAuthenticatedUser, authorizeRoles("superAdmin"), getAdminStores)

router.route("/superAdmin/store/new").post(isAuthenticatedUser, authorizeRoles("superAdmin"), createStore);

router.route("/store/:id").get(getStoreDetails)

module.exports = router;
