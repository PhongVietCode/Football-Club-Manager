import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[90%] max-w-[1500px] h-[80%] shadow-md rounded-xl flex justify-center
      ">
        <div className="flex items-center gap-3">
          {/* https://c4.wallpaperflare.com/wallpaper/398/874/541/champions-league-stadium-wallpaper-preview.jpg */}
          <div
            className={`w-20 aspect-square ring-1 ring-black/20 rounded-full bg-contain bg-no-repeat bg-center bg-[url('assets/images/ronaldo-mu.png')]`}
          ></div>
          <div className="font-montserrat font-semibold text-3xl">
            {user.fullName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
