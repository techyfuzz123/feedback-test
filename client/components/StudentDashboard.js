import { useAuthContext } from "../hooks/useAuthContext";

const StudentDashboard = ({user}) => {
  const { logout } = useAuthContext();

  return (
    <>
      <div className="text-3xl">Student Dashboard</div>
      <div className="flex justify-center text-5xl text-gray-100">
        {user.name}
      </div>
      <div className="mt-6 flex sm:w-full">
        <div
          onClick={logout}
          className="mt-6 w-full rounded-xl border p-6 text-left hover:text-gray-50 focus:text-gray-50"
        >
          <h3 className="text-2xl font-bold">Logout &rarr;</h3>
          <p className="mt-4 text-xl">Click this box to logout</p>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
