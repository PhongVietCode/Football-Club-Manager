type TeamSplitResponse = {
    teamId: number;
    highest: boolean;
    lowest: boolean;
    teamColor: string;
    teamName: string;
    totalElo: number;
    players: MemberResponse[]
}