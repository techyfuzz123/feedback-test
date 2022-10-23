const UserDashboard = ({ user }) => {
  return (
    <>
      <div className="text-3xl">User Dashboard</div>
      <div className="flex justify-center text-5xl text-gray-100">{user.userName}</div>
    </>
  );
};

export default UserDashboard;
