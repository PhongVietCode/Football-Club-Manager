import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLazyGetInfoQuery } from "@/api/member";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/api/auth";
import { LoadingSpin } from "@/customComponents/LoadingSpin";

const MainLayout = () => {
  const [
    getMemberInfo,
    { data: user, isLoading: isLoadingUser, isFetching: isFetchingUser },
  ] = useLazyGetInfoQuery();
  const [logout, { isLoading: isLogout }] = useLogoutMutation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(0);
  if (isDarkMode) {
    document.querySelector("html")?.classList.add("dark");
  } else {
    document.querySelector("html")?.classList.remove("dark");
  }
  useEffect(() => {
    getMemberInfo()
      .unwrap()
      .then(() => {
        navigate("home", { replace: true });
      })
      .catch(() => {
        navigate("/auth/login", { replace: true });
      });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-50/15 dark:bg-vBlackBold/90">
      <nav className="w-full flex flex-row justify-between items-center px-8 py-2 bg-white dark:bg-vBlackLight shadow-md sticky top-0 z-50">
        <Link to={"/home"} className="cursor-pointer">
          <div className="flex flex-row items-center text-themed">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"
              className="h-16 p-2"
            ></img>
            <span className="font-newAmsterdam text-2xl ml-1 text-black dark:text-white">
              Vozer FootBall
            </span>
          </div>
        </Link>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            value={isDarkMode}
            onCheckedChange={(checked) => setIsDarkMode(checked ? 1 : 0)}
          />
          <Label
            htmlFor="dark-mode"
            className="font-palanquin font-semibold text-md"
          >
            Dark Mode
          </Label>
        </div>
        <ul className="text-white flex flex-row flex-[0.4] justify-evenly max-xl:hidden">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-item ${isActive && "text-vRedLight scale-110"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive && "text-vRedLight scale-110"}`
            }
            to="/leaderBoard"
          >
            LeaderBoard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive && "text-vRedLight scale-110"}`
            }
            to="/profile"
          >
            Profile
          </NavLink>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 max-xl:mx-2">
              <div
                className={`w-10 aspect-square ring-1 ring-black/20 dark:ring-white rounded-full bg-contain bg-no-repeat bg-center bg-[url('assets/images/ronaldo-mu.png')]`}
              ></div>
              <div className="text-black dark:text-white font-palanquin font-semibold text-lg hover:text-vRedBold max-xl:hidden">
                {user?.fullName}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isLogout ? (
              <LoadingSpin />
            ) : (
              <div
                className="cursor-pointer"
                onClick={() =>
                  logout()
                    .unwrap()
                    .then(() => {
                      navigate("/auth/login", { replace: true });
                    })
                }
              >
                <DropdownMenuLabel>Log out</DropdownMenuLabel>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <GiHamburgerMenu
              color="red"
              size={24}
              className="max-xl:block xl:hidden mx-2"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col gap-3 items-center space-x-2">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `font-palanquin font-semibold ${
                    isActive && "text-vRedLight scale-110"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `font-palanquin font-semibold ${
                    isActive && "text-vRedLight scale-110"
                  }`
                }
                to="/leaderBoard"
              >
                LeaderBoard
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `font-palanquin font-semibold ${
                    isActive && "text-vRedLight scale-110"
                  }`
                }
                to="/profile"
              >
                Profile
              </NavLink>
              <div className="flex gap-2">
                <Switch
                  id="dark-mode"
                  value={isDarkMode}
                  onCheckedChange={(checked) => setIsDarkMode(checked ? 1 : 0)}
                />
                <Label
                  htmlFor="dark-mode"
                  className="font-palanquin font-semibold text-md"
                >
                  Dark Mode
                </Label>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="flex-1 flex">
        {isLoadingUser || isFetchingUser ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin">
              <AiOutlineLoading3Quarters
                className="animate-spin"
                color="white"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1">
            {user == null ? (
              <div className="text-white">Not found user</div>
            ) : (
              <Outlet />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
