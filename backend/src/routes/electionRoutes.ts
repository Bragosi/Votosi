import express from "express";
import { CreateElection } from "../controllers/electionControllers/CreateElection.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { GetAllElection } from "../controllers/electionControllers/GetAllElection.js";
import { DeleteElection } from "../controllers/electionControllers/DeleteElection.js";

const router = express.Router();
router.post("/createElection", protectRoute, CreateElection);
router.get("/getAllElections", GetAllElection); 
router.delete("/deleteElection/:electionId", DeleteElection);
export default router;

