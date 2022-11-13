import React, { useEffect, useState } from "react";
import AdminDashboard from "@adminComponents/AdminDashboard";
import { useAuth } from "@context/AuthContext";
import FacultyDashboard from "@facultyComponents/FacultyDashboard";

export default function Dashboard() {
  const [user, setUser] = useState();
  const { fetchUser } = useAuth();

  useEffect(() => {
    setUser(fetchUser());
  }, []);

  if (user?.role === "ADMIN") {
    return <AdminDashboard user={user} />;
  } else if (user?.role === "ADVISOR") {
    return <FacultyDashboard user={user} />;
  }

  // * Checking if User exits
  return <div>dashboard</div>;
}
