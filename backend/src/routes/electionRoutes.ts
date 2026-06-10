import express from "express";
import { CreateElection } from "../controllers/electionControllers/CreateElection.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { GetAllElection } from "../controllers/electionControllers/GetAllElection.js";
import { DeleteElection } from "../controllers/electionControllers/DeleteElection.js";
import { EditElection } from "../controllers/electionControllers/EditElection.js";
import { CreateCandidate } from "../controllers/electionControllers/CreateCandidate.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();
router.post("/createElection", protectRoute, CreateElection);
router.get("/getAllElections", GetAllElection); 
router.delete("/deleteElection/:electionId", protectRoute, DeleteElection);
router.put("/editElection/:electionId", protectRoute, EditElection);
router.post("/createCandidate/:electionId/candidate", protectRoute, upload.single("profilePicture"), CreateCandidate);
export default router;

