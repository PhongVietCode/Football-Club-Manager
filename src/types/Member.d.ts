type MemberResponse = {
  id: string;
  fullName: string;
  email?: string;
  role?: string;
  elo?: number;
  createdAt?: string;
};

type PlayerResponse = {
  id: string;
  fullName: string;
  elo: number;
};

type MemberUpdateEloRequest = {
  elo?: number;
  id: string;
};
type MemberUpdateRoleRequest = {
  role: string;
  memberId: string;
};
type MemberUpdateInfoRequest = {
  fullName: string;
  id: string;
};
