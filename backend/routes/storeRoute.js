const express = require("express");
const {
  createStore,
  getAllStores,
  getAdminStores,
  getStoreDetails,
  updateStore,
  deleteStore,
  createStoreReview,
  getStoreReviews,
} = require("../controllers/storeControllers");

const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();


router.route("/stores").get(getAllStores);

router.route("/superAdmin/stores").get(isAuthenticatedUser, authorizeRoles("superAdmin"), getAdminStores)

router.route("/superAdmin/store/new").post(isAuthenticatedUser, authorizeRoles("superAdmin"), createStore);

router.route("/superAdmin/store/:id")
.put(isAuthenticatedUser, authorizeRoles("superAdmin"), updateStore)
.delete(isAuthenticatedUser, authorizeRoles("superAdmin"), deleteStore)

router.route("/store/:id").get(getStoreDetails)

router.route("/review").put(isAuthenticatedUser, createStoreReview)

router.route("/reviews/:id")
.get(getStoreReviews)

module.exports = router;
