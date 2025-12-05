import React from "react";
import Logo from "../assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { profile_Route, Routes_Index, signIn_Route } from "@/helper/RoutesName";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import userPng from "../assets/images/user.png";
import { FaUserTie } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";
import { setuserLogout } from "@/redux/user/userSlice";
import { toastmessage } from "@/helper/ToastReact";

export default function Topbar() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_AUTH_URL_BACKEND + "/logout",
        {
          withCredentials: true,
        }
      );

      const successMsg = response?.data?.message || "Logout successful";
      toastmessage(successMsg, "success");

      dispatch(setuserLogout());
      navigate(Routes_Index);
    } catch (error) {
      toastmessage(error.message || "Logout failed", "error");
    }
  };

  return (
    <div className="h-16 flex justify-between fixed w-full z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 items-center shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-11 drop-shadow-sm" />
      </div>

      {/* Search Bar */}
      <div>
        <Input
          className="w-80 bg-gray-100 rounded-xl shadow-inner focus-visible:ring-2 focus-visible:ring-indigo-400"
          placeholder="Search here..."
        />
      </div>

      {/* Right Section */}
      <div>
        {!isLoggedIn ? (
          <Link to={signIn_Route}>
            <Button className="cursor-pointer rounded-xl px-6 py-2 shadow-md hover:shadow-lg transition-all">
              Sign In
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-10 w-10 ring-2 ring-gray-300 shadow-sm cursor-pointer hover:scale-105 transition">
                <AvatarImage src={user?.avatar || userPng} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 rounded-xl shadow-lg border border-gray-200">
              <DropdownMenuLabel className="pb-2">
                <p className="font-semibold text-gray-800 text-base">
                  {user?.username}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  to={profile_Route}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FaUserTie className="text-indigo-500" /> Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="" className="flex items-center gap-2 cursor-pointer">
                  <FaPlus className="text-green-600" /> Create Post
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 cursor-pointer"
                >
                  <AiOutlineLogout /> Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
