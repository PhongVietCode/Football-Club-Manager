import { Button } from "@/components/ui/button";
import { DragAndDrop, SubMatches } from "@/customComponents";
import { useEffect, useState } from "react";
import { useCreateMatchContext } from "../CreateMatchLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSaveTeamMutation, useSplitTeamMutation } from "@/api/team";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLazyGetSubMatchesQuery } from "@/api/match";
import { LoadingSpin } from "@/customComponents/LoadingSpin";

// const getPlayers = (start: number, end: number) => {
//   return listPlayers.slice(start, end);
// };
export const SplitTeam = () => {
  const navigate = useNavigate();
  const { user } = useCreateMatchContext();
  const { id } = useParams();
  const { state } = useLocation();
  const [splitTeam, { data: teamSplitResponse, isLoading: isSplitingTeam }] =
    useSplitTeamMutation();
  const [saveTeam, { isLoading: isSavingTeam }] = useSaveTeamMutation();
  const [getSubMatches, { data: subMatches, isLoading: isGettingSubMatches }] =
    useLazyGetSubMatchesQuery();
  const [teams, setTeams] = useState<MemberResponse[][]>([]);
  const [teamsInfo, setTeamsInfo] = useState<TeamSplitResponse[]>();
  const handleSplitTeam = () => {
    if (id != undefined) {
      splitTeam({
        creatorId: user.id,
        matchId: parseInt(id),
        teamNumber: state.teamNumber,
      })
        .unwrap()
        .then((result) => {
          console.log(result);
          let playerInTeams = [];
          for (let i = 0; i < result.length; i++) {
            playerInTeams.push(result[i].players);
          }
          setTeams(playerInTeams);
          setTeamsInfo(result);
        });
    }
  };
  const handleSaveTeam = () => {
    if (id == undefined || teamsInfo == undefined) return;
    saveTeam({ creatorId: user.id, matchId: parseInt(id), teams: teamsInfo })
      .unwrap()
      .then((result) => {
        console.log(result);
        navigate(`/match/${id}`);
      });
  };
  const handleGetSubMatches = () => {
    if (id == undefined) return;
    getSubMatches({ matchId: parseInt(id) }).unwrap();
  };
  useEffect(() => {
    handleSplitTeam();
    handleGetSubMatches();
  }, []);

  const handleSetTeams = (teams: MemberResponse[][]) => {
    setTeams(teams);
  };
  return (
    <div>
      <div className="big-title my-4">List Players</div>
      <div className="flex flex-row flex-wrap gap-2">
        {isSplitingTeam ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <DragAndDrop
            player_teams={teams}
            setPlayerTeams={handleSetTeams}
            teamInfo={teamSplitResponse}
            draggable={false}
          />
        )}
      </div>
      <div className="flex justify-evenly my-4">
        {isSplitingTeam ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <Button
            className="bg-vRedBold hover:bg-vRedLight px-16 py-2 font-semibold"
            onClick={handleSplitTeam}
          >
            Re-split
          </Button>
        )}
      </div>
      <div className="flex flex-col">
        <div className="big-title my-2">List Match: <span className="font-palanquin font-medium">(this function just work well for a match with 4 teams)</span></div>
        {isGettingSubMatches ? (
          <LoadingSpin />
        ) : (
          <div className="self-center">
            <SubMatches subMatchList={subMatches?.subMatches} />
          </div>
        )}
      </div>
      <div className="flex justify-evenly my-4">
        {isSavingTeam ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          <Button
            className="bg-vRedBold hover:bg-vRedLight px-16 py-2 font-semibold"
            onClick={handleSaveTeam}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};
