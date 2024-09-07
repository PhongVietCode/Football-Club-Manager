import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogCreateMember,
  DragAndDrop,
  SelectorNumber,
} from "@/customComponents";
import { useEffect, useState } from "react";
import { useCreateMatchContext } from "../CreateMatchLayout";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useLazyGetMemberListInMatchQuery,
  useRegisterMemberListInMatchMutation,
} from "@/api/match";

export const AddPlayerManual = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [
    getMemberList,
    { isLoading: isLoadingMemberList, isFetching: isFetchingMemberList },
  ] = useLazyGetMemberListInMatchQuery();
  const [registerMemberList, { isLoading: isRegistering }] =
    useRegisterMemberListInMatchMutation();
  const [teamCount, setTeamCount] = useState<string>("4");
  const [playerEachTeam, setPlayerEachTeam] = useState<string>("5");
  const [playerName, setPlayerName] = useState("");
  // const [openDialog, setOpenDialog] = useState(false);
  const { handleNextStep, handlePrevStep } = useCreateMatchContext();

  const [teams, setTeams] = useState<MemberResponse[][]>([[], []]);
  const handleGetRegisterMemberList = (newMember?: MemberResponse) => {
    if (id != undefined) {
      getMemberList({ matchId: parseInt(id) })
        .unwrap()
        .then((result) => {
          if (result) {
            if (newMember != undefined) {
              setTeams((oldTeams) => [
                [...oldTeams[0], newMember],
                oldTeams[1],
              ]);
            } else {
              setTeams([result.notRegisteredMembers, result.registeredMembers]);
            }
          }
        });
    }
  };
  useEffect(() => {
    handleGetRegisterMemberList();
  }, []);
  const handleSetTeams = (teams: MemberResponse[][]) => {
    setTeams(teams);
  };

  function submit() {
    if (id != undefined) {
      registerMemberList({ players: teams[1], matchId: parseInt(id) })
        .unwrap()
        .then(() => {
          navigate(`/create-match/${id}/step-3`, {
            state: { teamNumber: teamCount },
          });
          handleNextStep();
        });
    }
  }
  return (
    <div className="flex-1 h-full">
      <div className="big-title text-3xl text-center text-black dark:text-white">
        Add Player To Team
      </div>
      <div className="flex max-md:flex-col justify-between gap-2 mb-4">
        <div className="md:mr-4 flex max-md:flex-1 max-md:justify-between gap-4">
          <SelectorNumber
            label="Team Count*:"
            arrayItem={Array.from(Array(7).keys())}
            placeHolderName="Team Count*:"
            setValue={setTeamCount}
            value={teamCount}
            textStyle="text-black dark:text-white"
          />
          <SelectorNumber
            label="Player each team*:"
            arrayItem={Array.from(Array(8).keys())}
            placeHolderName="Team Count*:"
            setValue={setPlayerEachTeam}
            value={playerEachTeam}
            textStyle="text-black dark:text-white"
          />
        </div>
        <div className="flex-1">
          <span className="text-black dark:text-white">Player name: </span>
          <Input
            placeholder="Type player name..."
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
        </div>
        <div className="self-end max-md:self-center">
          <DialogCreateMember
            playerName={playerName}
            refetch={handleGetRegisterMemberList}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-10">
        {isLoadingMemberList || isFetchingMemberList ? (
          <AiOutlineLoading3Quarters />
        ) : (
          <>
            {teams == undefined ? (
              <div>Memberlist not found</div>
            ) : (
              <DragAndDrop
                player_teams={teams}
                setPlayerTeams={handleSetTeams}
                supportClick={true}
              />
            )}
          </>
        )}
      </div>
      <div className="flex justify-end gap-4">
        {teams[1].length > parseInt(teamCount) * parseInt(playerEachTeam) && (
          <div className="text-vRedLight font-palanquin font-semibold">
            Players is higher than possible{" "}
          </div>
        )}
        <div className="flex flex-col  text-black dark:text-white text-end font-palanquin font-semibold text-lg">
          <div>Players:</div>
          <div>
            {teams[1].length}/{parseInt(teamCount) * parseInt(playerEachTeam)}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <Button
          className="hidden bg-vRedBold hover:bg-vRedLight px-8 py-2 font-semibold"
          onClick={handlePrevStep}
        >
          Back
        </Button>
        {isRegistering ? (
          <AiOutlineLoading3Quarters className="animate-spin" size={24} />
        ) : (
          <Button
            className="bg-vRedBold hover:bg-vRedLight px-16 py-2 font-semibold"
            onClick={submit}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
