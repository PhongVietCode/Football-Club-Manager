import { colorMap } from "@/constants";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateSubMatchesMutation } from "@/api/match";
import { DialogDescription } from "@radix-ui/react-dialog";
type SubMatchesDetailProps = {
  list: string[] | undefined;
  setList: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  matchId: number | undefined;
  matchLocked?: boolean;
};
export const SubMatchesDetail = (props: SubMatchesDetailProps) => {
  const { list, setList, matchId, matchLocked } = props;
  const [updateScore] = useUpdateSubMatchesMutation();
  return (
    <div className="flex-1 mt-4 flex flex-col md:px-52 max-md:px-0 gap-2">
      {list?.map((match, index) => {
        const teams = match.split("/")[0];
        const firstTeam = teams.split("-")[0].split("_")[0];
        const firstTeamScore = teams.split("-")[0].split("_")[1];
        const secondTeam = teams.split("-")[1].split("_")[0];
        const secondTeamScore = teams.split("-")[1].split("_")[1];
        const firstTeamColor = colorMap.get(firstTeam);
        const secondTeamColor = colorMap.get(secondTeam);
        const hanleUpateSubmatch = (
          index: number,
          firstTeamScore: number,
          secondTeamScore: number
        ) => {
          const newList = [...list];
          newList[
            index
          ] = `${firstTeam}_${firstTeamScore}-${secondTeam}_${secondTeamScore}-1/${teams[1]}`;
          setList(newList);
        };
        const handleSaveSubMatchesList = () => {
          if (matchId != undefined) {
            updateScore({ matchId: matchId, subMatches: list })
              .unwrap()
              .then((result) => {
                console.log(result);
              });
          }
        };
        return (
          <Dialog key={index}>
            <DialogTrigger>
              <div className="flex flex-row justify-end items-center gap-2">
                <div className="font-palanquin w-10 max-md:w-2">{index}.</div>
                <div className="flex-1 border-[1px] border-black dark:border-white rounded-md px-4 py-2 flex justify-between items-center ">
                  <div className="flex-1 flex justify-start items-center text-left">
                    <div className={`flex-1 max-xl:hidden`}>
                      <div
                        className={`w-[30%] rounded-lg h-10 grid place-items-center ${firstTeamColor[0]}`}
                      >
                        {/* <FaRegStar size={24} /> */}
                      </div>
                    </div>
                    <div className="font-palanquin font-semibold text-lg flex-1">
                      {firstTeam}{" "}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-4 max-md:gap-0">
                    <div className="font-montserrat font-bold text-xl">
                      {firstTeamScore}{" "}
                    </div>
                    <div className="font-montserrat font-bold text-xl">:</div>
                    <div className="font-montserrat font-bold text-xl">
                      {secondTeamScore}
                    </div>
                  </div>
                  <div className="flex justify-end items-center flex-1">
                    <div className="flex-1 text-end font-palanquin font-semibold text-lg">
                      {secondTeam}
                    </div>
                    <div className={`flex-1 flex justify-end  max-xl:hidden`}>
                      <div
                        className={`w-[30%] rounded-lg grid place-items-center h-10 ${secondTeamColor[0]}`}
                      >
                        {/* <FaRegStar size={24} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            {matchLocked ? (
              <DialogContent className="max-w-[90%] max-h-screen">
                <DialogHeader>
                  <DialogTitle>
                    <div>Match has been locked </div>
                  </DialogTitle>
                  <DialogDescription>
                    You cannot update submatches scores anymore.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div>Update score:</div>
                    <div className="my-2">Match {index}</div>
                  </DialogTitle>
                </DialogHeader>
                <div>
                  <div className="flex flex-col">
                    <div
                      className={`flex flex-col px-4 text-center font-palanquin rounded-lg text-4xl ${firstTeamColor[0]}`}
                    >
                      {firstTeam}
                    </div>
                    <div className="font-newAmsterdam text-8xl p-0 m-0 text-black dark:text-white">
                      <div className="flex justify-evenly my-2">
                        <div
                          className="border-[2px] px-4 rounded-md cursor-pointer"
                          onClick={() => {
                            if (parseInt(firstTeamScore) > 0)
                              hanleUpateSubmatch(
                                index,
                                parseInt(firstTeamScore) - 1,
                                parseInt(secondTeamScore)
                              );
                          }}
                        >
                          -
                        </div>
                        <div>{firstTeamScore}</div>
                        <div
                          className="border-[2px] px-4 rounded-md cursor-pointer"
                          onClick={() => {
                            hanleUpateSubmatch(
                              index,
                              parseInt(firstTeamScore) + 1,
                              parseInt(secondTeamScore)
                            );
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div className="flex justify-evenly my-2">
                        <div
                          className="border-[2px] px-4 rounded-md cursor-pointer"
                          onClick={() => {
                            if (parseInt(secondTeamScore) > 0)
                              hanleUpateSubmatch(
                                index,
                                parseInt(firstTeamScore),
                                parseInt(secondTeamScore) - 1
                              );
                          }}
                        >
                          -
                        </div>
                        <div>{secondTeamScore}</div>
                        <div
                          className="border-[2px] px-4 rounded-md cursor-pointer"
                          onClick={() => {
                            hanleUpateSubmatch(
                              index,
                              parseInt(firstTeamScore),
                              parseInt(secondTeamScore) + 1
                            );
                          }}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col px-4 text-center font-palanquin rounded-lg text-4xl ${secondTeamColor[0]}`}
                    >
                      <div>{secondTeam}</div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose
                    className="bg-red-600 text-white hover:bg-vRedBold px-8 py-2 flex-1 rounded-md"
                    onClick={handleSaveSubMatchesList}
                  >
                    Save
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        );
      })}
    </div>
  );
};
