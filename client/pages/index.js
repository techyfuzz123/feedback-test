import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { loadUser } from "../hooks/loadUser";
import Login from "../components/Login";
import StudentDashboard from "../components/StudentDashboard";
import UserDashboard from "../components/UserDashboard";

const Home = () => {
  const { logout } = useAuthContext();
  const [user, setUser] = useState();

  // * Checking if User exits
  useEffect(() => {
    setUser(loadUser());
  }, []);

  // * render Login Component if user does'nt exists
  if (!user) return <Login />;

  if(user.userData.regNo) return <StudentDashboard user={user.userData} />

  if(user.userData.role) return <UserDashboard user={user.userData} />;

  // * render this Component if user exists
  return (
    <>
      <main className="flex flex-col">
        <h1 className="text-6xl font-bold">
          Welcome <span className="text-gray-50">{user.userData.name}</span>
        </h1>

        <div className="mt-6 flex sm:w-full">
          <div
            onClick={logout}
            className="mt-6 w-full rounded-xl border p-6 text-left hover:text-gray-50 focus:text-gray-50"
          >
            <h3 className="text-2xl font-bold">Logout &rarr;</h3>
            <p className="mt-4 text-xl">Click this box to logout</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
