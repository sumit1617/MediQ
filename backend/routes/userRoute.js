const express = require("express");
const { 
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassoword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUserRole,
    deleteUser
} = require("../controllers/userControllers");


const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassoword)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router
.route("/superadmin/users")
.get(isAuthenticatedUser, authorizeRoles("superAdmin", "admin"), getAllUsers)

router
.route("/superadmin/user/:id")
.get(isAuthenticatedUser, authorizeRoles("superAdmin", "admin"), getUser)
.put(isAuthenticatedUser, authorizeRoles("superAdmin", "admin"), updateUserRole)
.delete(isAuthenticatedUser, authorizeRoles("superAdmin", "admin"), deleteUser)

module.exports = router;