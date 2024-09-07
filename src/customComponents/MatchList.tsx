import { MatchCardInfo } from "./MatchCardInfo";
import { useGetMatchListQuery } from "@/api/match";

export const MatchList = () => {
  const {
    data: matches,
    isLoading: isLoadingMatches,
    isFetching: isFetchingMatches,
  } = useGetMatchListQuery();

  return (
    <div className="">
      {isLoadingMatches || isFetchingMatches ? (
        <div className="flex gap-2 max-md:flex-col">
          {Array.from(Array(2).keys()).map(() => (
            <LoadingMatchCardInfo />
          ))}
        </div>
      ) : (
        <div>
          {!matches || matches.length == 0 ? (
            <div className="dark:text-white text-center">
              Matches list is empty
            </div>
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

const LoadingMatchCardInfo = () => {
  return (
    <div className="md:w-[300px] max-md:flex-1 rounded-md overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-32 bg-gray-100"></div>
      <div className="flex mt-4 p-2 flex-col">
        <div className="w-full h-6 bg-gray-100 rounded-md"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="w-10 h-4 bg-gray-100 rounded-md"></div>
          <div className="w-32 h-4 bg-gray-100 rounded-md"></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="w-10 h-4 bg-gray-100 rounded-md"></div>
          <div className="w-20 h-4 bg-gray-100 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
