import express from "express";
import { CreateElection } from "../controllers/electionControllers/CreateElection.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.post("/createElection", protectRoute, CreateElection);

export default router;
