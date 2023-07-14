"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success(response?.data?.message);
      if (response?.data?.success) {
        router.push("/profile");
      }
    } catch (err: any) {
      const res = err?.response?.data;
      const message = res?.message ? res?.message : res?.error;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col  xl:min-w-[700px] md:min-w-full p-8">
        <h2 className="mb-4">Login Page</h2>

        <label className="mb-2 text-sm" htmlFor="user_name">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered input-primary w-full"
          value={user.email}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <br />
        <label className="mb-2 text-sm" htmlFor="user_name">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary w-full"
          value={user.password}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <br />
        <Link href="/signup">Don't have an account?Signup here</Link>
        <br />
        <button
          onClick={onLogin}
          disabled={isDisabled}
          className="btn btn-primary max-w-[150px]"
        >
          {loading && <span className="loading loading-spinner"></span>}
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
