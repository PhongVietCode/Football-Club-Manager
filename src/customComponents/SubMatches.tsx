import { colorMap } from "@/constants";

type SubMatchesProps = {
  subMatchList: string[] | undefined;
};

export const SubMatches = (props: SubMatchesProps) => {
  const { subMatchList } = props;
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        {subMatchList?.map((match, index) => {
          const teams = match.split("/")[0];
          const firstTeam = teams.split("-")[0].split("_")[0];
          const secondTeam = teams.split("-")[1].split("_")[0];
          const firstTeamColor = colorMap.get(firstTeam);
          const secondTeamColor = colorMap.get(secondTeam);
          return (
            <div className="border-[1px] border-dashed rounded-md border-black dark:border-white" key={index}>
              <div className="text-center font-palanquin font-bold">{index}</div>
              <div className="flex flex-col justify-center text-center text-black font-bold min-w-[100px]">
                <div className={`p-2 ${firstTeamColor[0]}`}>{firstTeam}</div>
                <div className={`p-2 ${secondTeamColor[0]}`}>{secondTeam}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
