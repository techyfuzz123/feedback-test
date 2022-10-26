import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = ({ user }) => {
  const { logout, loggedIn } = useAuth();

  if (loggedIn) {
    return (
      <>
        {/* whole dashboard */}
        <div className="flex flex-col justify-center">
          {/* user details */}
          <div className="flex flex-col sm:flex-row items-center mb-5 justify-between pt-10">
            {/* name && regNo */}
            <div>
              <div className="mb-5 pointer-events-none">
                <label htmlFor="name" className="mr-12">
                  Name:
                </label>
                <input
                  className="outline-none py-1 px-2 rounded bg-white  cursor-not-allowed"
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor="reg_number">Reg number: </label>
                <input
                  className="outline-none px-2 py-1 mb-5 rounded bg-white cursor-not-allowed"
                  type="number"
                  name="reg_number"
                  id="reg_number"
                  value={user.regNo}
                  readOnly
                />
              </div>
            </div>

            {/* class & batch */}
            <div>
              <div className="mb-5">
                <label htmlFor="Dept_&_sec">Dept & sec: </label>
                <input
                  className="outline-none px-2 py-1 rounded bg-white  cursor-not-allowed"
                  type="text"
                  name="Dept_&_sec"
                  id="Dept_&_sec"
                  value={user.degree}
                  readOnly
                />
              </div>

              <div className="">
                <label htmlFor="batch" className="mr-10">
                  Batch:{" "}
                </label>
                <input
                  className="outline-none mb-5 px-2 select-none py-1 rounded bg-white cursor-not-allowed "
                  type="number"
                  name="batch"
                  id="batch"
                  readOnly
                  value={user.batch}
                />
              </div>
            </div>
          </div>
          {/* feedback  table and button */}
          <div className="">
            {/* feedack table */}
            <div
              className="my-5  rounded-sm overflow-x-auto shadow-lg  bg-white text-xs
               
           md:text-sm"
            >
              {user.subjects && (
                <table className="w-full ">
                  <thead className="bg-gray-50 border-b-2 border-gray-200 ">
                    <tr>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Sno
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Faculty Name
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Name of Subject
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Subject Knowledge
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Clear Explanation
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Usage of Teaching Tools
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Extra input
                      </th>
                      <th
                        className="w-20 py-2 border border-b-2 border-gray-200 text-sm
                 font-semibold text-center"
                      >
                        Teacher-Student
                        <br />
                        Relationship
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {user.subjects.map((subject, sNo) => {
                      return (
                        <tr className="border border-b-2 border-gray-200">
                          <td className="border border-b-2 border-gray-200">
                            {sNo + 1}
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            {subject.faculty}
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            {subject.subjectName}
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            <input
                              type="text"
                              className="outline-none m-1 p-full text-center"
                            />
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            <input className="outline-none m-1 p-full text-center" />
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            <input className="outline-none m-1 p-full text-center" />
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            <input className="outline-none m-1 p-full text-center" />
                          </td>
                          <td className="border border-b-2 border-gray-200">
                            <input className="outline-none m-1 p-full text-center" />
                          </td>
                        </tr>
                      );
                    })}
                    {/* <tr className="">
                  <td className="">1</td>
                  <td className="">Dr.D.Satheesh Kumar</td>
                  <td className="">Internet and Web Technology</td>
                  <td className="">
                    <input className="" />
                  </td>
                  <td className="">
                    <input className="" />
                  </td>
                  <td className="">
                    <input className="" />
                  </td>
                  <td className="">
                    <input className="" />
                  </td>
                  <td className="">
                    <input className="" />
                  </td>
                </tr> */}
                  </tbody>
                </table>
              )}
              {!user.subjects && <span className="">{user.message}</span>}
            </div>

            {/* submit and logout buttons */}
            <div className="flex  justify-around items-center">
              <button className="bg-green-500 shadow-lg text-white font-bold px-12 py-3 rounded-xl">
                Submit
              </button>
              <button
                onClick={logout}
                className="bg-green-500 shadow-lg text-white font-bold px-12 py-3 rounded-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

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

      <div className="mt-6 flex sm:w-full">
        <div
          onClick={loggedIn}
          className="mt-6 w-full rounded-xl border p-6 text-left hover:text-gray-50 focus:text-gray-50"
        >
          <h3 className="text-2xl font-bold">LoggedIn &rarr;</h3>
          <p className="mt-4 text-xl">Click this box to loggedIn</p>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
