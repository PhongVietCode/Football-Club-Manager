import moment from "moment";
import { Link } from "react-router-dom";

type MatchCardInfoProps = {
  match: MatchInfoItemResponse;
  index: number;
};
const MatchCardInfo = (props: MatchCardInfoProps) => {
  const { match, index } = props;

  return (
    <Link
      to={`/match/${match.id}`}
      state={{ id: match.id }}
      className="min-w-[200px] flex-1 sm:max-w-[300px]"
    >
      <div
        className="text-themed bg-white shadow-md backdrop-blur-sm hover:bg-white/50 dark:bg-vBlackLight dark:hover:bg-vBlackBold hover:-translate-y-1 transition-transform cursor-pointer rounded-md overflow-hidden"
        key={index}
      >
        <div className="bg-card bg-cover bg-center bg-no-repeat h-32 w-full">
          {match.scheduleTime && (
            <div className="backdrop-blur-md h-full flex flex-col items-center justify-center">
              <div className="font-palanquin font-semibold text-xl">
                Open vote at:{" "}
              </div>
              <div className="font-newAmsterdam text-4xl">
                {" "}
                {moment(match.scheduleTime).format("HH:MM - DD/MM")}
              </div>
            </div>
          )}
        </div>
        <div className="p-2">
          <div className="flex flex-col py-2">
            <span className="title-subject">Address:</span>{" "}
            <span className="context-subject text-left">
              {match.fieldAddress}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="title-subject">Time:</span>{" "}
            <span className="context-subject">
              {moment(match.eventDate).format("HH:mm - DD/MM")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="title-subject">Creator:</span>{" "}
            <span className="context-subject">{match.creatorFullName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { MatchCardInfo };
