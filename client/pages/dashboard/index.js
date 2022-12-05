import React, { useEffect, useState } from "react";
import AdminDashboard from "@adminComponents/AdminDashboard";
import FacultyDashboard from "@facultyComponents/FacultyDashboard";
import { useRouter } from "next/router";
import { useAuth } from "@context/AuthContext";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const user = fetchUser();
    if (!user) {
      router.push("/");
    }
    setUser(user);
  }, []);

  if (user?.role === "ADMIN") {
    return <AdminDashboard user={user} />;
  } else if (user?.role === "ADVISOR") {
    return <FacultyDashboard user={user} />;
  }

  // * Checking if User exits
  return <div>dashboard</div>;
}
