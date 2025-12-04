import React from "react";
import { Button } from "./ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helper/FirebaseSupport";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toastmessage } from "@/helper/ToastReact";
import { Routes_Index } from "@/helper/RoutesName";
import { setuserLoggedIn } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const GoogleResponse = await signInWithPopup(auth, provider);
      // console.log(GoogleResponse);

      const payload = {
        email: GoogleResponse.user.email,
        username: GoogleResponse.user.displayName,
        avatar: GoogleResponse.user.photoURL,
        googleId: GoogleResponse.user.uid,
      };

      const response = await axios.post(
        import.meta.env.VITE_AUTH_URL_BACKEND + "/google-login",
        payload,
        { withCredentials: true }
      );

      dispatch(setuserLoggedIn(response?.data?.user));

      toastmessage(response?.data?.message || "Login successful", "success");

      navigate(Routes_Index);
    } catch (error) {
      console.log(error);
      toastmessage(
        error?.response?.data?.message || "Google Login failed",
        "error"
      );
    }
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      type="button"
      variant="outline"
      className="w-full h-11 text-base cursor-pointer gap-2"
    >
      <FcGoogle />
      Continue with Google
    </Button>
  );
}
