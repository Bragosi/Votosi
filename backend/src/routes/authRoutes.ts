import { AdminSignup } from '../controllers/authControllers/AdminLogin.js';
import express from 'express';
import { logout } from '../controllers/authControllers/logout.js';
import { RegisterOfficer } from '../controllers/authControllers/RegisterOfficer.js';
import { checkAuth } from '../controllers/authControllers/checkAuth.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { upload } from '../middleware/upload.js';
import { RegisterVoter } from '../controllers/authControllers/RegisterVoters.js';
import { GetRegisteredOfficers } from '../controllers/ManageUser/GetRegisteredOfficers.js';


const router = express.Router();
router.post("/signup", AdminSignup);
router.post("/logout", logout)
router.post("/registerOfficer", upload.single("profilePicture"), RegisterOfficer)
router.get("/check", protectRoute, checkAuth)
router.post("/registerVoter", upload.single("profilePicture"), RegisterVoter)
router.get("/getRegisteredOfficers", GetRegisteredOfficers)
export default router;