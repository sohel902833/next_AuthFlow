"use client";

import { useUserContext } from "@/store/UserContext";

const UserProfile = () => {
  const { age, email, name, phone } = useUserContext();
  return (
    <div>
      Name : {name}
      <br />
      Age : {age}
      <br />
      Email : {email}
      <br />
      Phone : {phone}
      <br />
    </div>
  );
};

export default UserProfile;
