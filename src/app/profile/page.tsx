"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>({});
  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      toast.success(response?.data?.message);
      if (response?.data?.success) {
        router.push("/login");
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
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUser(res?.data?.data);
      console.log(res.data);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h4 className="mb-4 text-primary font-extrabold text-2xl">Profile </h4>
      <br />
      <div className="text-xl">
        <h3>Name : {user?.username}</h3>
        <h3>Email : {user?.email}</h3>
        {user?._id && <Link href={`/profile/${user?._id}`}>View More</Link>}
      </div>
      <br />
      <button
        onClick={onLogout}
        disabled={loading}
        className="btn btn-outline btn-accent"
      >
        {loading && <span className="loading loading-spinner"></span>}
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
