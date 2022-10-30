import { useAuth } from "../../context/AuthContext";

const Faculty = ({ user }) => {
  const { facultyLogout, loggedIn } = useAuth();

  <div className="w-full pt-8">
    <div className="flex justify-center text-3xl">Faculty Dashboard</div>
    <div className="flex justify-center text-5xl text-gray-900">
      userName: {user.userName}
    </div>
    <div className="flex justify-center text-5xl text-gray-900">
      role: {user.role}
    </div>

    <div className="mt-6 flex sm:w-full">
      <div
        onClick={facultyLogout}
        className="mt-6 w-full rounded-xl border p-6 text-center cursor-pointer  "
      >
        <h3 className="text-2xl font-bold">Logout &rarr;</h3>
        <p className="mt-4 text-xl">Click this box to logout</p>
      </div>
    </div>
    <div className="mt-6 flex sm:w-full">
      <div
        onClick={loggedIn}
        className="mt-6 w-full rounded-xl border p-6 text-center cursor-pointer"
      >
        <h3 className="text-2xl font-bold">LoggedIn &rarr;</h3>
        <p className="mt-4 text-xl">Click this box to loggedIn</p>
      </div>
    </div>
  </div>;
};

export default Faculty;
