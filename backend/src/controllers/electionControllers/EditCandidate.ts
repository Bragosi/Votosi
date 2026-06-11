import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

interface Params {
  electionId: string;
  candidateId: string;
}

interface AuthenticatedUser {
  id: string;
}

// ✅ FIX: include Params in Request typing correctly
export interface AuthenticatedRequest extends Request<Params> {
  user?: AuthenticatedUser;
}

export const EditCandidate = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { electionId, candidateId } = req.params;

    // 🔐 auth guard
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      firstName,
      surname,
      otherName,
      DOB,
      sex,
      maritalStatus,
      state,
      LGA,
      education,
      bio,
      party,
    } = req.body;

    // ✅ required fields validation
    if (
      !firstName ||
      !surname ||
      !DOB ||
      !sex ||
      !maritalStatus ||
      !state ||
      !LGA ||
      !education ||
      !bio ||
      !party
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // 🔐 admin check
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.isActivated) {
      return res.status(403).json({ message: "Account not activated" });
    }

    if (admin.role !== "ADMIN") {
      return res.status(403).json({
        message: "Only admins can edit candidates",
      });
    }

    // 🗳️ election check
    const election = await prisma.election.findUnique({
      where: { id: electionId },
    });

    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    if (election.status !== "DRAFT") {
      return res.status(400).json({
        message: "Election must be in DRAFT state",
      });
    }

    // 👤 candidate check
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!existingCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // 📸 REQUIRED IMAGE
    if (!req.file) {
      return res.status(400).json({
        message: "Profile picture is required",
      });
    }

    const uploadedImage: any = await uploadToCloudinary(req.file.buffer);

    if (!uploadedImage?.secure_url) {
      return res.status(500).json({
        message: "Image upload failed",
      });
    }

    const profilePicture = uploadedImage.secure_url;

    // ✏️ update candidate
    const updatedCandidate = await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        firstName,
        surname,
        otherName: otherName || null,
        DOB,
        sex,
        maritalStatus,
        state,
        LGA,
        education,
        bio,
        party,
        profilePicture,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });
  } catch (error) {
    console.error("Error editing candidate:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while updating candidate",
    });
  }
};