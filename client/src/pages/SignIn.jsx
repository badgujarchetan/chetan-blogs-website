"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { signUp_Route } from "@/helper/RoutesName";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleSignIn(data) {
    console.log("Login form data:", data);

    // Reset form after submit
    form.reset();
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-sm rounded-2xl border">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-1">Sign In</h2>
        {/* <p className="text-center text-gray-500 mb-6">
          Welcome back! Login to your account.
        </p> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="space-y-5"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="h-11 pr-10"
                      />
                    </FormControl>

                    {/* Eye Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            {/* <div className="text-right -mt-2">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </a>
            </div> */}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 text-base cursor-pointer"
            >
              Sign In
            </Button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 text-base cursor-pointer"
            >
              Continue with Google
            </Button>

            {/* Signup Redirect */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a
                href={signUp_Route}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Sign Up
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
