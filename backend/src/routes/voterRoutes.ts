import express from "express";
import { logout } from "../controllers/authControllers/logout.js";
import { VoterLogin } from "../controllers/authControllers/VoterLogin.js";
import { ActivateVoterAccount } from "../controllers/authControllers/ActivateVoterAccount.js";
import { GetVoterElection } from "../controllers/electionControllers/GetVotersElection.js";

const router = express.Router();
router.post("/voterLogin", VoterLogin);
router.post("/logout", logout);
router.post("/activateVoterAccount", ActivateVoterAccount);
router.get("/getVoterElections", GetVoterElection);

export default router;
