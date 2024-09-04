import { useLazyGetMatchInfoQuery } from "@/api/match";
import { LoadingSpin } from "@/customComponents/LoadingSpin";
import moment from "moment";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
const MatchLayout = () => {
  const { id } = useParams();
  const [
    getMatchInfo,
    {
      data: matchInfo,
      isLoading: isLoadingMatchInfo,
      isFetching: isFetchingMatchInfo,
    },
  ] = useLazyGetMatchInfoQuery();
  useEffect(() => {
    if (id != undefined) {
      getMatchInfo({ matchId: parseInt(id) }, true);
    }
  }, []);
  return (
    <div className="px-16 max-md:px-8 pt-4 w-full h-full">
      {isLoadingMatchInfo || isFetchingMatchInfo ? (
        <LoadingSpin/>
      ) : (
        <div>
          <div className="flex flex-col md:justify-center md:items-center">
            <div className="md:min-w-[500px] max-md:flex-1 bg-white/5  border-[1.2px] border-black/10 shadow-md dark:border-white/10 px-4 py-4 rounded-lg overflow-hidden">
              <div className="big-title p-0 text-black dark:text-white text-center">
                Match Info:{" "}
              </div>
              <div className="">
                <div className="flex flex-row justify-between  py-2">
                  <span className="title-subject w-20">Địa điểm:</span>{" "}
                  <span className="context-subject text-left">
                    {matchInfo?.fieldAddress}
                  </span>
                </div>
                <div className=" flex flex-row  justify-between">
                  <span className="title-subject w-20">Thời gian:</span>{" "}
                  <span className="context-subject">
                    {moment(matchInfo?.eventDate).format("HH:MM - DD/MM")}
                  </span>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <span className="title-subject w-20">Người tạo:</span>{" "}
                  <span className="context-subject">
                    {matchInfo?.creatorFullName}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-lg text-vRedBold font-semibold">Lưu ý: Đến đúng giờ, mặc đúng màu áo. </div>
          </div>

          <Outlet
            context={
              { matchInfo, id } satisfies {
                matchInfo: MatchInfoResponse | undefined;
                id: string | undefined;
              }
            }
          />
        </div>
      )}
    </div>
  );
};

export { MatchLayout };
