import { firework1, silverBarcay, ronaldoMu } from "@/assets";
import { Button } from "@/components/ui/button";
import { colorMap } from "@/constants";
import Team from "@/customComponents/Team";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useLazyGetSubMatchesQuery } from "@/api/match";
import { useEffect, useState } from "react";
import { LoadingSpin } from "@/customComponents/LoadingSpin";
import { SubMatches, SubMatchesDetail } from "@/customComponents";
import { RankTable } from "@/customComponents/RankTable";
export const MatchInfo = () => {
  const { matchInfo, id } = useOutletContext<{
    matchInfo: MatchInfoResponse | undefined;
    id: string | undefined;
  }>();
  const [getSubMatches, { data: subMatches, isLoading: isGettingSubMatches }] =
    useLazyGetSubMatchesQuery();
  const user = useSelector((state: RootState) => state.user);
  const [subMatchList, setSubMatchList] = useState(subMatches?.subMatches);
  useEffect(() => {
    if (id != undefined) {
      getSubMatches({ matchId: parseInt(id) })
        .unwrap()
        .then((result) => setSubMatchList(result.subMatches));
    }
  }, []);
  const [currentView, setCurrentView] = useState(0);
  return (
    <div>
      <div className="hidden">
        <div className="flex justify-center flex-col items-center mt-4">
          <div className="text-themed text-2xl font-montserrat font-semibold">
            Vote is opening ...
          </div>
          <div className="text-themed font-newAmsterdam text-8xl my-2">
            0/20
          </div>
          <Button className="bg-vRedLight text-xl font-montserrat px-7">
            Vote now!
          </Button>
        </div>
        <div className="flex justify-center flex-col items-center mt-4">
          <div className="text-themed text-3xl font-montserrat font-semibold">
            Vote is closed.
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between">
        <div className="flex-1 max-xl:flex-1">
          <div className="flex items-center flex-row mt-4">
            <div className="big-title m-0 p-0 text-black dark:text-white">
              Teams:
            </div>
            <div className="flex-1 h-[2px] bg-black/20 dark:bg-white/20 mx-4"></div>
            {user.role == "GOLDEN_KEY" && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="px-2 py-1 hover:bg-black/10 dark:hover:bg-white/5 rounded-lg">
                    <BsThreeDots size={20} color="red" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link to={`/create-match/${id}/step-2`}>
                    <DropdownMenuLabel>Add more players</DropdownMenuLabel>
                  </Link>
                  <Link
                    to={`/create-match/${id}/step-3`}
                    state={{ teamNumber: matchInfo?.teams.length }}
                  >
                    <DropdownMenuLabel>Resplit Team</DropdownMenuLabel>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div className="flex flex-row max-md:flex-col gap-2 sm:gap-0 flex-wrap justify-center mt-2">
            {matchInfo?.teams.map((team) => {
              const color = colorMap.get(team.teamColor);
              return <Team key={team.teamId} teamInfo={team} color={color} />;
            })}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center flex-row my-4">
              <div className="big-title p-0">List Match: </div>
              <div className="flex-1 h-[2px] bg-black/20 dark:bg-white/20 mx-4"></div>
            </div>

            {isGettingSubMatches ? (
              <LoadingSpin />
            ) : (
              <div className="self-center">
                <SubMatches subMatchList={subMatches?.subMatches} />
              </div>
            )}
          </div>
          <div className="flex justify-center my-4">
            <div className="flex rounded-lg overflow-hidden">
              <div
                className={`px-28 py-2 max-sm:px-4 font-palanquin font-semibold text-lg max-md:text-sm cursor-pointer ${
                  currentView != 0
                    ? "text-slate-900 bg-gray-200"
                    : "bg-vRedLight text-white"
                }`}
                onClick={() => setCurrentView(0)}
              >
                Match List:
              </div>
              <div
                className={`px-28 py-2 max-sm:px-4  font-palanquin font-semibold text-lg max-md:text-sm cursor-pointer ${
                  currentView != 1
                    ? "text-slate-900 bg-gray-200"
                    : "bg-vRedLight text-white"
                }`}
                onClick={() => setCurrentView(1)}
              >
                Rank Table:
              </div>
            </div>
          </div>
          {currentView == 0 ? (
            <div className="mb-16 ">
              <SubMatchesDetail
                matchLocked={matchInfo?.locked}
                list={subMatchList}
                setList={setSubMatchList}
                matchId={parseInt(id || "0")}
              />
            </div>
          ) : (
            <RankTable rankList={subMatches?.leaderboard} />
          )}
        </div>

        <div className="z-10 hidden">
          <img
            src={firework1}
            alt=""
            className="h-[60%] absolute -z-10 right-10 top-20 opacity-50 "
          />
          <img
            src={silverBarcay}
            alt=""
            className="h-[65%] absolute -z-10 bottom-40 right-[200px] -rotate-6"
          />
          <div className="">
            <img
              src={ronaldoMu}
              alt=""
              className="h-[50%] z-10 absolute bottom-10 right-32 rotate-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
