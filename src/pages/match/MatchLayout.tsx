import { useLazyGetMatchInfoQuery, useUpdateMatchMutation } from "@/api/match";
import { LoadingSpin } from "@/customComponents/LoadingSpin";
import moment from "moment";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LoadingMatch } from "@/assets/animation";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LuPencil } from "react-icons/lu";
const MatchLayout = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [
    getMatchInfo,
    {
      data: matchInfo,
      isLoading: isLoadingMatchInfo,
      isFetching: isFetchingMatchInfo,
    },
  ] = useLazyGetMatchInfoQuery();
  const [updateMatch, { isLoading: isUpdatingMatch }] =
    useUpdateMatchMutation();
  useEffect(() => {
    if (id != undefined) {
      getMatchInfo({ matchId: parseInt(id) }, true);
    }
  }, []);

  const [toggleAddress, setToggleAddress] = useState(false);
  const [toggleTime, setToggleTime] = useState(false);
  const [address, setAddress] = useState(matchInfo?.fieldAddress || "");
  const [timeEvent, setTimeEvent] = useState(
    moment(matchInfo?.eventDate || 0).format("HH:MM - DD/MM")
  );
  useEffect(() => {
    setAddress(matchInfo?.fieldAddress || "");
    setTimeEvent(moment(matchInfo?.eventDate || 0).format("HH:MM - DD/MM"));
  }, [isLoadingMatchInfo]);
  const navigate = useNavigate();
  return (
    <div className="px-16 max-md:px-8 pt-4 w-full h-full">
      {isLoadingMatchInfo || isFetchingMatchInfo ? (
        <div className="flex-1 grid place-items-center">
          <LoadingSpin
            useIconAnimation
            sourceAnimation={LoadingMatch}
            title="Loading Match Infomation"
          />
        </div>
      ) : (
        <div>
          <div
            className="lg:absolute max-lg:my-2 group flex justify-center items-center gap-2 cursor-pointer px-4 py-2 bg-black/5 hover:bg-vRedLight rounded-xl hover:text-white"
            onClick={() => {
              navigate(-1);
              sessionStorage.setItem("currentPath", "/home");
            }}
          >
            <MdKeyboardArrowLeft
              className="opacity-10 group-hover:opacity-100 max-xl:opacity-100 transition-opacity"
              size={24}
            />
            <span className="font-palanquin font-medium text-xl">Back</span>
          </div>
          <div className="flex flex-col lg:justify-center lg:items-center">
            <div className="lg:min-w-[500px] max-lg:flex-1 bg-white/5  border-[1.2px] border-black/10 shadow-md dark:border-white/10 px-4 py-4 rounded-lg overflow-hidden">
              <div className="relative flex big-title p-0 text-black dark:text-white justify-center">
                Match Info:{" "}
                {user.role == "GOLDEN_KEY" && (
                  <div className="absolute right-0 px-2 py-1 rounded-lg cursor-pointer hover:bg-black/5">
                    {isUpdatingMatch ? (
                      <LoadingSpin />
                    ) : (
                      <div
                        onClick={() =>
                          updateMatch({
                            matchId: parseInt(id || ""),
                            locked: !matchInfo?.locked,
                          })
                        }
                      >
                        {matchInfo?.locked ? <FaLock /> : <FaUnlock />}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="">
                <div className="flex flex-row justify-between py-2">
                  <span className="title-subject w-20">Địa điểm:</span>{" "}
                  <div className="flex-1 flex justify-end items-center gap-2">
                    {toggleAddress ? (
                      <input
                        value={address}
                        onChange={(event) =>
                          setAddress(event.currentTarget.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key == "Enter") {
                            setToggleAddress(false);
                          }
                        }}
                        className="flex-1"
                      ></input>
                    ) : (
                      <span className="context-subject text-left">
                        {address}
                      </span>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setToggleAddress(!toggleAddress);
                      }}
                    >
                      <LuPencil />
                    </div>
                  </div>
                </div>
                <div className=" flex flex-row justify-between">
                  <span className="title-subject w-20">Thời gian:</span>{" "}
                  <div className="flex-1 flex justify-end items-center gap-2">
                    {toggleTime ? (
                      <input
                        value={timeEvent}
                        onChange={(event) =>
                          setTimeEvent(event.currentTarget.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key == "Enter") {
                            setToggleTime(false);
                          }
                        }}
                        className="flex-1"
                      ></input>
                    ) : (
                      <span className="context-subject">{timeEvent}</span>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setToggleTime(!toggleTime);
                      }}
                    >
                      <LuPencil />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <span className="title-subject w-20">Người tạo:</span>{" "}
                  <span className="context-subject">
                    {matchInfo?.creatorFullName}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-lg text-vRedBold font-semibold">
              Lưu ý: Đến đúng giờ, mặc đúng màu áo.{" "}
            </div>
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
