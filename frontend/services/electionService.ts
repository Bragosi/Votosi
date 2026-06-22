/**
 * Election API service — maps to voter-facing backend election endpoints.
 * Backend routes: /api/voter/elections, /api/voter/candidates/:electionId,
 *                 /api/voter/elections/:electionId/candidates/:candidateId,
 *                 /api/voter/castVote/:candidateId
 */
import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants/Api';

export type ElectionStatus = 'DRAFT' | 'UPCOMING' | 'ACTIVE' | 'CLOSED';

export type PoliticalParty =
  | 'APC' | 'PDP' | 'LP' | 'NNPP' | 'APGA' | 'SDP' | 'YPP';

export interface Election {
  id: string;
  title: string;
  description?: string;
  status: ElectionStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  surname: string;
  otherName?: string;
  DOB: string;
  sex: string;
  maritalStatus: string;
  state: string;
  LGA: string;
  education: string;
  bio: string;
  imageUrl: string;
  party: PoliticalParty;
  electionId: string;
  _count?: { votes: number };
}

export interface CandidateDetail extends Candidate {
  election: Election;
  voteCount: number;
  hasVoted?: boolean;
}

export interface CastVoteResponse {
  message: string;
  data?: any;
}

export const electionService = {
  /**
   * Get all elections visible to the voter.
   * GET /api/voter/elections
   */
  getElections: async (): Promise<{ message: string; data: Election[] }> => {
    const { data } = await apiClient.get(API_ENDPOINTS.VOTER_ELECTIONS);
    return data;
  },

  /**
   * Get all candidates in an election (mobile-optimised).
   * GET /api/voter/candidates/:electionId
   */
  getCandidates: async (electionId: string): Promise<{ message: string; data: Candidate[] }> => {
    const { data } = await apiClient.get(API_ENDPOINTS.VOTER_CANDIDATES(electionId));
    return data;
  },

  /**
   * Get full details of a single candidate including vote count.
   * GET /api/voter/elections/:electionId/candidates/:candidateId
   */
  getCandidateDetail: async (
    electionId: string,
    candidateId: string
  ): Promise<{ message: string; data: CandidateDetail }> => {
    const { data } = await apiClient.get(
      API_ENDPOINTS.VOTER_CANDIDATE_DETAIL(electionId, candidateId)
    );
    return data;
  },

  /**
   * Cast a vote for a candidate.
   * POST /api/voter/castVote/:candidateId
   */
  castVote: async (candidateId: string): Promise<CastVoteResponse> => {
    const { data } = await apiClient.post(API_ENDPOINTS.VOTER_CAST_VOTE(candidateId));
    return data;
  },
};
