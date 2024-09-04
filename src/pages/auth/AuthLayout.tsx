import SoccerBall from "@/assets/images/soccer-ball.jpg";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center relative overflow-hidden">
      <img
        src={SoccerBall}
        alt="Login Image"
        className="absolute animate-spin-slow min-w-[1500px] max-md:min-w-[800px] top-1/2 -z-10"
      />
      <div className="w-full flex justify-center items-center ">
        <Outlet/>
      </div>
    </div>
  );
};
export default AuthLayout;
