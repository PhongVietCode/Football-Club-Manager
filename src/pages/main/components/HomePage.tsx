import { MatchList } from "@/customComponents";
import { Button } from "@/components/ui/button";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="flex-1 p-4 ">
      <div className="flex flex-row flex-wrap justify-between max-md:justify-evenly">
        <div className="text-vWhite">
          <span className="font-montserrat font-regular text-[18px] text-vGrayLight">
            Welcome,{" "}
          </span>
          <span className="font-montserrat font-semibold text-[35px] text-vRedBold dark:text-white">
            {user.fullName} !
          </span>
        </div>
        <div className="self-end max-md:mt-2">
          {user.role == "GOLDEN_KEY" && (
            <Button
              className="bg-vRedBold hover:bg-vRedLight hover:shadow-2xl"
              onClick={() => navigate("/create-match/step-1")}
            >
              <IoAddOutline className="mr-2" />
              <span>Create new match</span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="big-title mb-3">This week matches:</div>
        <div className="">
          <MatchList />
        </div>
        <div className="big-title mb-3">Your match:</div>
        <div>
          <MatchList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
