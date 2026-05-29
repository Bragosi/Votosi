
import express from "express";
import { logout } from "../controllers/authControllers/logout.js";
import { RegisterOfficer } from "../controllers/authControllers/RegisterOfficer.js";
import { checkAuth } from "../controllers/authControllers/checkAuth.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { upload } from "../middleware/upload.js";
import { RegisterVoter } from "../controllers/authControllers/RegisterVoters.js";
import { GetRegisteredOfficers } from "../controllers/ManageUser/GetRegisteredOfficers.js";
import { GetRegisteredVoters } from "../controllers/ManageUser/GetRegisteredVoters.js";
import { DeleteOfficer } from "../controllers/ManageUser/DeleteOfficer.js";
import { DeleteVoter } from "../controllers/ManageUser/DeleteVoter.js";
import { ActivateAdminAccount } from "../controllers/authControllers/ActivateAdminAccount.js";
import { AdminLogin } from "../controllers/authControllers/AdminLogin.js";

const router = express.Router();
router.post("/adminLogin", AdminLogin);
router.post("/logout", logout);
router.post(
  "/registerOfficer",
  upload.single("profilePicture"),
  RegisterOfficer,
);
router.get("/check", protectRoute, checkAuth);
router.post("/registerVoter", upload.single("profilePicture"), RegisterVoter);
router.get("/getRegisteredOfficers", GetRegisteredOfficers);
router.get("/getRegisteredVoters", GetRegisteredVoters);
router.delete("/deleteOfficer/:officerId", DeleteOfficer);
router.delete("/deleteVoter/:voterId", DeleteVoter);
router.post("/activateAdminAccount", ActivateAdminAccount);
export default router;
