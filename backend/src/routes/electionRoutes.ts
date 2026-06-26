import express from "express";
import { CreateElection } from "../controllers/electionControllers/CreateElection.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { GetAllElection } from "../controllers/electionControllers/GetAllElection.js";
import { DeleteElection } from "../controllers/electionControllers/DeleteElection.js";
import { EditElection } from "../controllers/electionControllers/EditElection.js";
import { CreateCandidate } from "../controllers/electionControllers/CreateCandidate.js";
import { upload } from "../middleware/upload.js";
import { GetCandidatesInElection } from "../controllers/electionControllers/GetCandidatesInElection.js";
import { DeleteCandidate } from "../controllers/electionControllers/DeleteCandidate.js";
import { GetCandidateById } from "../controllers/electionControllers/GetCandidateById.js";
import { adminOnly } from "../middleware/adminMiddleWare.js";
import { EditCandidate } from "../controllers/electionControllers/EditCandidate.js";

const router = express.Router();
router.post("/createElection", protectRoute, adminOnly, CreateElection);
router.get("/getAllElections", GetAllElection); 
router.delete("/deleteElection/:electionId", protectRoute, adminOnly, DeleteElection);
router.put("/editElection/:electionId", protectRoute, adminOnly, EditElection);
router.post("/createCandidate/:electionId/candidate", protectRoute, adminOnly, upload.single("profilePicture"), CreateCandidate);
router.get("/getCandidatesInElection/:electionId", GetCandidatesInElection); 
router.delete("/deleteCandidate/:candidateId", protectRoute, adminOnly,  DeleteCandidate);
router.get("/getCandidateById/:candidateId", GetCandidateById); 
router.put("/editCandidate/:candidateId",protectRoute,adminOnly,upload.single("profilePicture"),EditCandidate
);
export default router;

