import { useEffect, useState } from "react";
import Login from "../components/Login";
import StudentDashboard from "../components/StudentDashboard";
import UserDashboard from "../components/UserDashboard";
import { useAuth } from "../context/AuthContext";


const Home = () => {
  const [user, setUser] = useState();
  const {fetchUser} = useAuth()

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
      
      {user && user.regNo && <StudentDashboard user={user} />}
      {user && user.role && <UserDashboard user={user} />}
    </>
  );
};

export default Home;
