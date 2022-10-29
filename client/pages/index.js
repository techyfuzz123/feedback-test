import { useEffect, useState } from "react";
import Login from "../components/Login";
import StudentDashboard from "../components/StudentDashboard";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [user, setUser] = useState();
  const { fetchUser } = useAuth();

  // * Checking if User exits
  useEffect(() => {
    setUser(fetchUser());
  }, []);

  // * render Login Component if user does'nt exists
  if (!user) return <Login />;

  // if (user.regNo) return <StudentDashboard user={user} />;

  // if (user.role == "ADMIN") return <AdminDashboard user={user} />;

  // * render this Component for anything else
  return (
    <>
      {user && user.regNo && <StudentDashboard user={user} />}
      {user && user.role == "ADMIN" && <AdminDashboard user={user} />}
      {user && user.role == "ADVISOR" && <FacultyDashboard user={user} />}
      <div>errorCode : 101</div>
    </>
  );
};

export default Home;
