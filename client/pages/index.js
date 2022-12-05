import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Login from "@components/Login";
import StudentDashboard from "@components/StudentDashboard";
import { useAuth } from "@context/AuthContext";

const Home = () => {
  const [user, setUser] = useState(null);
  const { fetchUser} = useAuth();
  const router = useRouter();


  useEffect(() => {
    const user = fetchUser()
    setUser(user)
  }, []);

  // * render Login Component if user does'nt exists
  if (!user) return <Login />;

  if (user?.regNo) return <StudentDashboard />;

  if (user?.role === "ADMIN" || user.role === "ADVISOR") {
    router.push("/dashboard");
  }

  // * render this Component for anything else
  return (
    <>
      {user && user.role != "ADMIN" && user.role != "ADVISOR" && (
        <div>errorCode : 101, {user.role}</div>
      )}
    </>
  );
};

export default Home;
