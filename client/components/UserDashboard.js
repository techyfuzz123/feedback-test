import { useAuthContext } from "../hooks/useAuthContext";

const UserDashboard = ({ user }) => {
  const { userLogout } = useAuthContext();

  return (
    <>
      <div className="flex justify-center text-3xl">User Dashboard</div>
      <div className="flex justify-center text-5xl text-gray-100">
        userName: {user.userName}
      </div>
      <div className="flex justify-center text-5xl text-gray-100">
        role: {user.role}
      </div>

      <div className="mt-6 flex sm:w-full">
        <div
          onClick={userLogout}
          className="mt-6 w-full rounded-xl border p-6 text-left hover:text-gray-50 focus:text-gray-50"
        >
          <h3 className="text-2xl font-bold">Logout &rarr;</h3>
          <p className="mt-4 text-xl">Click this box to logout</p>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
