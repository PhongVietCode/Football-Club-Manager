type MatchCreateRequest = {
  eventDate: string;
  fieldAddress: string;
  scheduleTime?: string;
  creatorId: string;
};
type MatchResponse = {
  id: number;
  evenDate: number;
  fieldAddress: string;
  creator_id: string;
  players: PlayerResponse[];
  locked: boolean;
};
type MatchInfoResponse = {
  eventDate: number;
  fieldAddress: string;
  creatorFullName: string;
  teams: TeamSplitResponse[];
  locked: boolean;
};
type MatchInfoItemResponse = {
  id: number;
  eventDate: number;
  fieldAddress: string;
  creatorFullName: string;
  scheduleTime?: string;
  locked: boolean;
};

type MatchRegisterRequest = {
  memberId: string;
  matchId: number;
};
type MatchUpdateRequest = {
  eventDate?: string;
  fieldAddress?: string;
  scheduleTime?: string;
  creatorId?: string;
  locked?: boolean;
};
type MatchResponseItem = {
  id: number;
  eventDate: number;
  fieldAddress: string;
  creatorFullName: string;
};

type ListMemberMatchResponse = {
  registeredMembers: MemberResponse[],
  notRegisteredMembers: MemberResponse[]
}

type SubMatchResponse = {
  subMatches: string[]
  leaderboard: string[]
}