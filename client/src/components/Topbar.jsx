import React from "react";
import Logo from "../assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { signIn_Route } from "@/helper/RoutesName";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";

export default function Topbar() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  return (
    <div className="h-16 flex justify-between fixed w-full z-20 bg-white border-b border-gray-200 px-4 items-center">
      <div>
        <img src={Logo} alt="Logo" className="h-12" />
      </div>

      <div>
        <Input className="w-80 bg-gray-100" placeholder="Search here..." />
      </div>

      <div>
        {!isLoggedIn ? (
          <Link to={signIn_Route}>
            <Button className="cursor-pointer">Sign In</Button>
          </Link>
        ) : (
          <div>Welcome, {user?.username} !</div>
        )}
      </div>
    </div>
  );
}
