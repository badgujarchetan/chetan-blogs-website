import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toastmessage } from "@/helper/ToastReact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().min(6, "Bio is required"),
  password: z.string(),
});

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);
      toastmessage("Updating profile...", "success");

      setTimeout(() => {
        toastmessage("Profile Updated Successfully!", "success");
        setLoading(false);
      }, 1200);
    } catch (error) {
      toastmessage(error.message || "Login failed", "error");
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-6 ">
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar */}
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateProfile)}
            className="w-full space-y-5"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="write your bio" {...field} />
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
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base cursor-pointer"
            >
              {loading ? " Updated Profile..." : " Updated Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
