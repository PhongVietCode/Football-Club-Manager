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
};
type MatchInfoResponse = {
  eventDate: number;
  fieldAddress: string;
  creatorFullName: string;
  teams: TeamSplitResponse[];
};
type MatchInfoItemResponse = {
  id: number;
  eventDate: number;
  fieldAddress: string;
  creatorFullName: string;
  scheduleTime?: string;
};

type MatchRegisterRequest = {
  memberId: string;
  matchId: number;
};
type MatchUpdateRequest = {
  eventDate: string;
  fieldAddress: string;
  scheduleTime: string;
  creatorId: string;
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