import express from "express"
import {deleteUser, forgotPassword, getAllUser, getSingleUserDetails, getUserDetails, loginuser, logout, registeruser, resetPassword, updatePassword, updateProfile, updateRole} from "../controllers/usercontroller.js"
import {isAuthenticatedUser , authorisedRoles} from "../middlewares/authentification.js"

export const userRouter = express.Router();

userRouter.route("/register").post(registeruser);
userRouter.route("/login").post(loginuser);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/password/reset/:token").put(resetPassword);
userRouter.route("/me").get(isAuthenticatedUser,getUserDetails);
userRouter.route("/logout").get(logout);
userRouter.route("/password/update").put(isAuthenticatedUser,updatePassword);
userRouter.route("/me/update").put(isAuthenticatedUser,updateProfile);
userRouter.route("/admin/users").get(getAllUser); //To be Improved
userRouter.route("/admin/user/:id").get(isAuthenticatedUser,authorisedRoles("admin"),getSingleUserDetails).put(isAuthenticatedUser,authorisedRoles("admin"),updateRole).delete(isAuthenticatedUser,authorisedRoles("admin"),deleteUser);
