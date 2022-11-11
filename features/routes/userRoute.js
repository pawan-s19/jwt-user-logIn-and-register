var express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
var router = express.Router();

/* POST /registerUser */
router.post("/registeruser", registerUser);

/* POST /login */
router.post("/login", loginUser);

/* POST /forgotpassword */
router.post("/forgotpassword", forgotPassword);

/*GET /resetpassword */
router.get("/resetpassword/:token", resetPassword);

/*GET /userdetails */
router.get("/getuser", isAuthenticated, getUserDetails);

/*POST /updatePassword */
router.post("/updatepassword", isAuthenticated, updatePassword);

/*POST /updateProfile */
router.post("/updateprofile", isAuthenticated, updateProfile);

/*GET /getallusers (admin) */
router.get(
  "/admin/getallusers",
  isAuthenticated,
  isAdmin("admin"),
  getAllUsers
);

/*GET /getsingleuser (admin) */
router.get(
  "/admin/get/singleuser/:id",
  isAuthenticated,
  isAdmin("admin"),
  getSingleUser
);

/*POST /updateUserRoleWithProfile */
router.post(
  "/admin/update/user/role/:id",
  isAuthenticated,
  isAdmin("admin"),
  updateUserRole
);

/* GET /deleteUser */
router.get(
  "/admin/deleteuser/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteUser
);

/* GET /logout */
router.get("/logout", logout);
module.exports = router;
