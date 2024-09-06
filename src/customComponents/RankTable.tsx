import { GiLaurelsTrophy } from "react-icons/gi";
import { PiMedalFill } from "react-icons/pi";
type RankTableProps = {
  rankList?: string[];
};
export const RankTable = (props: RankTableProps) => {
  const { rankList } = props;
  return (
    <div className="flex justify-center mb-4 ">
      <div className="rounded-lg px-4 py-2 shadow-lg dark:border-[2px] dark:border-white">
        <div className="text-center font-palanquin font-semibold text-lg mb-4">
          Rank Table
        </div>

        <div className="flex flex-col gap-4">
          {rankList?.map((item, index) => {
            const teamInfo = item.split("_");
            const teamName = teamInfo[0];
            const teamScore = teamInfo[1];
            const teamPoint = teamInfo[2];
            return (
              <div>
                {index == 0 ? (
                  <div className="flex flex-col items-center ">
                    <GiLaurelsTrophy color={teamName.toLowerCase()} size={80} />
                    <div className="w-full flex gap-10 justify-between items-center font-palanquin font-bold text-lg relative">
                      <div className="flex-1">{teamName}</div>
                      <div className="flex gap-8">
                        <div>{teamPoint}</div>
                        <div>{teamScore}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between font-palanquin font-medium text-base">
                    <PiMedalFill color={`gray`} size={20} className="mr-4" />
                    <div className="flex-1 min-w-[200px]">{teamName}</div>
                    <div className="flex gap-8">
                      <div>{teamPoint}</div>
                      <div>{teamScore}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-1 mt-4 flex justify-between font-palanquin font-medium">
          <div className="flex-1 min-w-[100px]">Team:</div>
          <div className="flex gap-4">
            <div>GD</div>
            <div>Pts</div>
          </div>
        </div>
      </div>
    </div>
  );
};
