import { MatchCardInfo } from "./MatchCardInfo";
import { useGetMatchListQuery } from "@/api/match";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const MatchList = () => {
  const {
    data: matches,
    isLoading: isLoadingMatches,
    isFetching: isFetchingMatches,
  } = useGetMatchListQuery();

  return (
    <div className="">
      {isLoadingMatches || isFetchingMatches ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <div>
          {!matches || matches.length == 0 ? (
            <div className="text-white text-center">Matches not found</div>
          ) : (
            <div
              className="flex flex-row flex-wrap gap-2"
              // style={{
              //   display: "grid",
              //   gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              //   justifyContent: "center",
              //   gap: 10,
              // }}
            >
              {matches.map((item, index) => (
                <MatchCardInfo match={item} index={index} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
