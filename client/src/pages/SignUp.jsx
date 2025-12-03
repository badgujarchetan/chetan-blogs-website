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

const formSchema = z
  .object({
    name: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Must be 10 digits").max(10),
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleSubmitData(data) {
    console.log("Signup: ", data);
    form.reset();
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-sm rounded-2xl border">
        <h2 className="text-3xl font-bold text-center mb-1">Sign Up</h2>
        {/* <p className="text-center text-gray-500 mb-6">
          Create a new account
        </p> */}

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

            {/* Phone */}
            {/* <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Password + Confirm Password → Same Row */}
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
            >
              Create Account
            </Button>

            {/* Login Redirect */}
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
