const StudentDashboard = ({user}) => {
  return (
    <>
      <div className="text-3xl">Student Dashboard</div>
      <div className="flex justify-center text-5xl text-gray-100">
        {user.name}
      </div>
    </>
  );
};

export default StudentDashboard;
