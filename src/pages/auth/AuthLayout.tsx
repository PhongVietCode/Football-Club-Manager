import { useLazyGetInfoQuery } from "@/api/member";
import SoccerBall from "@/assets/images/soccer-ball.jpg";
import { LoadingSpin } from "@/customComponents/LoadingSpin";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const AuthLayout = () => {
  document.querySelector("html")?.classList.remove("dark");
  const navigate = useNavigate();
  const [getMemberInfo, { isLoading: isGettingMemberInfo }] =
    useLazyGetInfoQuery();
  useEffect(() => {
    getMemberInfo()
      .unwrap()
      .then(() => {
        navigate(sessionStorage.getItem("currentPath") || "/home", {
          replace: true,
        });
      })
      .catch(() => {
        navigate("/auth/login", { replace: true });
      });
  }, []);
  return (
    <div className="">
      <div className="w-screen h-screen flex justify-center relative overflow-hidden">
        <img
          src={SoccerBall}
          alt="Login Image"
          className="absolute animate-spin-slow min-w-[1500px] max-md:min-w-[800px] top-1/2 -z-10"
        />
        {isGettingMemberInfo ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <LoadingSpin />
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};
export default AuthLayout;
