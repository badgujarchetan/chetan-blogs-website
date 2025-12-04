"use client";

import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toastmessage } from "../helper/ToastReact.js";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signIn_Route } from "@/helper/RoutesName";
import GoogleLogin from "@/components/GoogleLogin.jsx";
import { useDispatch } from "react-redux";
import { setuserLoggedIn } from "@/redux/user/userSlice.js";

const formSchema = z
  .object({
    name: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password too short"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmitData(values) {
    try {
      const payload = {
        username: values.name,
        email: values.email,
        password: values.password,
      };

      const response = await axios.post(
        import.meta.env.VITE_AUTH_URL_BACKEND + "/register",
        payload
      );

      const successMsg = response?.data?.message || "Registration successful";

      toastmessage(successMsg, "success");
      dispatch(setuserLoggedIn(response?.data?.user));
      navigate(signIn_Route);
      form.reset();
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Registration failed. Try again.";

      toastmessage(errorMsg, "error");
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-sm rounded-2xl border">
        <h2 className="text-3xl font-bold text-center mb-1">Sign Up</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitData)}
            className="space-y-5"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPass ? "text" : "password"}
                          className="h-11 pr-10"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={
                          showPass ? "Hide password" : "Show password"
                        }
                      >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm</FormLabel>

                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showCPass ? "text" : "password"}
                          className="h-11 pr-10"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowCPass(!showCPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={
                          showCPass
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showCPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 cursor-pointer text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
            <GoogleLogin />
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
