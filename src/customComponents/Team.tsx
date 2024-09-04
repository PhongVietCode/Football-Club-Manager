import { ListPlayer } from "./ListPlayer";

type TeamProps = {
  teamInfo: TeamSplitResponse;
  color: string;
};
const Team = (props: TeamProps) => {
  const { teamInfo, color } = props;
  return (
    <div className="md:min-w-[300px] max-md:flex-1 rounded-lg overflow-hidden border-2 border-white/10 shadow-md dark:border-white/20 backdrop-blur-md">
      <div className={`${color[0]} p-2 flex flex-row justify-between`}>
        <div className="text-black">
          {/* <span className="font-palanquin">Color: </span> */}
          <span className="font-montserrat font-bold">
            {teamInfo.teamColor}
          </span>
        </div>
        <div className="text-black">
          {/* <span className="font-palanquin">Total Elo:</span> */}
          <span className="font-montserrat font-bold">
            {" "}
            {teamInfo.totalElo}
          </span>
        </div>
      </div>
      <div
        className={`text-black dark:text-vWhite dark:bg-white/5 p-2 ${color[1]} backdrop-blur-sm`}
      >
        <ListPlayer players={teamInfo.players} />
      </div>
    </div>
  );
};

export default Team;
