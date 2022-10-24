import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { fetchUser } from "../hooks/fetchUser";
import Login from "../components/Login";
import StudentDashboard from "../components/StudentDashboard";
import UserDashboard from "../components/UserDashboard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { logout, loading } = useAuth();
  const [user, setUser] = useState();

  // * Checking if User exits
  useEffect(() => {
    setUser(fetchUser());
  }, []);

  // // * render Login Component if user does'nt exists
  // if (!user) return <Login />;

  // if (user.userData.regNo) return <StudentDashboard user={user.userData} />;

  // if (user.userData.role) return <UserDashboard user={user.userData} />;

  // * render this Component for anything else
  return (
    <>
      {!user && <Login />}
      
      {user && user.userData.regNo && <StudentDashboard user={user.userData} />}
      {user && user.userData.role && <UserDashboard user={user.userData} />}
    </>
  );
};

export default Home;
