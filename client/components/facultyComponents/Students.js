import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "@components/GlobalFilter";
import useFetch from "../../hooks/useFetch";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [a, setA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const isEven = (idx) => idx % 2 === 0;

  // Table
  const fetchStudents = async () => {
    const response = await useFetch("GET", "/staff/students").then(function ({
      status,
      data,
    }) {
      if (status === 401) return "not 200 status";
      return data;
    });

    if (response) {
      const students = response;
      const details = students[0];
      setStudents(students);
      setDetails(details);
    }
  };

  const studentsData = useMemo(() => [...students], [students]);
  const studentsColumns = useMemo(
    () => [
      {
        Header: "Register Number",
        accessor: "regNo",
      },
      {
        Header: "Student Name",
        accessor: "name",
      },
    ],
    [students]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => alert(row.values.regNo)}>Edit</button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: studentsColumns,
      data: studentsData,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;
  // End Table

  const AddStudentModel = () => {
    const [data, setData] = useState({
      regNo: "25936187",
      name: "sajja",
      dob: "07/03/2003",
      degree: "BE-CSE",
      section: "C",
      batch: "2020",
      password: "hicet",
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };

    const addStudent = async (data) => {
      setLoading(true);

      const body = [
        {
          regNo: Number(data.regNo),
          name: data.name,
          degree: data.degree,
          dob: data.dob,
          section: data.section,
          batch: Number(data.batch),
          password: data.password,
        },
      ];

      let response = { eMessage: "no value received", path: "addstudent" };

      response = await fetch(url + "/student", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then(async function (res) {
        const status = res.status;
        const data = await res.json();
        if (status != 200) {
          setError(data.eMessage);
          return data;
        }
        if (status === 200) {
          setA(false);
          return { Message: "student added", path: "addstudent" };
        }
        if (status === 409) {
          return { eMessage: data.eMessage, path: "addstudent" };
        }
      });

      setLoading(false);
      return response;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      if (
        !data.regNo ||
        !data.name ||
        !data.password ||
        !data.dob ||
        data.degree == "" ||
        data.degree == "Select" ||
        data.section == "" ||
        data.section == "Select" ||
        data.batch == "" ||
        data.batch == "Select"
      ) {
        setError("all fields should be filled");
        return;
      }
      if (!Number(data.regNo)) {
        setError("register number should be a numerical value");
        return;
      }
      if (
        !/([0-2]{1}[0-9]{1}|3[0-1]{1})[/](0[1-9]|1[0-2])[/]([0-9]{4})/.test(
          data.dob
        )
      ) {
        setError("date should be in the format dd/mm/yyyy");
        return;
      }
      if (data.password.length >= 10 || data.password.length < 5) {
        setError("password must be between 5 to 10 characters");
        return;
      }
      await addStudent(data);
      // if (res.eMessage) {
      //   setError(res.eMessage);
      //   return;
      // }
      fetchStudents();
    };

    return (
      <>
        {loading ? (
          <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                role="status"
                className="flex  flex-col items-center justify-center min-h-screen"
              >
                <div className=""></div>
                <span className="">Loading...</span>
              </div>
            </div>
          </>
        ) : (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            {/* background */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="flex min-h-full items-end justify-center p-4 text-center
           sm:items-center sm:p-0"
              >
                <div
                  className="relative transform overflow-hidden rounded-lg
             bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full 
             sm:max-w-lg"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="flex items-center justify-between">
                          <h3
                            className="text-lg font-medium leading-6 text-dark-purple"
                            id="modal-title"
                          >
                            Add Student
                          </h3>
                          <span
                            className="text-2xl text-dark-purple cursor-pointer
                             mr-1"
                            onClick={(e) => {
                              setA(false);
                            }}
                          >
                            x
                          </span>
                        </div>
                        {/* form */}
                        <div className="mt-2">
                          {error && (
                            <div className="mb-2 text-red-500">{error}</div>
                          )}
                          <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-lg"
                          >
                            <div className="flex flex-row -mx-3 mb-3">
                              {/* Register Number */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                  htmlFor="grid-register-number"
                                >
                                  Register Number
                                </label>
                                {/* border-red-500 */}
                                <input
                                  className="appearance-none block w-full bg-gray-200
                               text-gray-700 border  rounded
                                py-3 px-4 mb-3 leading-tight focus:outline-none
                                 focus:bg-white"
                                  id="grid-register-number"
                                  value={data.regNo}
                                  onClick={(e) => {
                                    setError("");
                                  }}
                                  onChange={handleChange}
                                  name="regNo"
                                  type="text"
                                  placeholder="123"
                                />
                                {/* <p className="text-red-500 text-xs italic">
                              Please fill out this field.
                            </p> */}
                              </div>

                              {/* Name */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                  htmlFor="grid-name"
                                >
                                  Name
                                </label>
                                <input
                                  className="appearance-none block w-full bg-gray-200
                               text-gray-700 border rounded
                                py-3 px-4 mb-3 leading-tight focus:outline-none
                                 focus:bg-white"
                                  id="grid-name"
                                  value={data.name}
                                  onChange={handleChange}
                                  onClick={(e) => {
                                    setError("");
                                  }}
                                  name="name"
                                  type="text"
                                  placeholder="Jane"
                                />
                                {/* <p className="text-red-500 text-xs italic">
                              Please fill out this field.
                            </p> */}
                              </div>
                            </div>

                            <div className="flex flex-row -mx-3 mb-6">
                              {/* batch */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide
                               text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-degree"
                                >
                                  Degree
                                </label>
                                <div className="relative">
                                  <select
                                    className="block appearance-none w-full
                                 bg-gray-200 border border-gray-200
                                  text-gray-700 py-3 px-4 pr-8 rounded 
                                  leading-tight focus:outline-none focus:bg-white
                                   focus:border-gray-500"
                                    id="grid-degree"
                                    value={data.degree}
                                    onClick={(e) => {
                                      setError("");
                                    }}
                                    onChange={handleChange}
                                    name="degree"
                                  >
                                    <option>Select</option>
                                    <option>BE-AERO</option>
                                    <option>BE-AGRI</option>
                                    <option>BE-AME</option>
                                    <option>BE-BME</option>
                                    <option>BTECH-CHE</option>
                                    <option>BE-CIVIL</option>
                                    <option>BE-CSE</option>
                                    <option>BE-ECE</option>
                                    <option>BE-EEE</option>
                                    <option>BE-EIE</option>
                                    <option>BTECH-FT</option>
                                    <option>BTECH-IT</option>
                                    <option>BTECH-AIML</option>
                                    <option>BE-MECHAT</option>
                                    <option>BE-MECH</option>
                                    <option>ME-CSE</option>
                                    <option>ME-ECE</option>
                                    <option>ME-ES</option>
                                    <option>ME-CAD/CAM</option>
                                    <option>MCA</option>
                                    <option>MBA</option>
                                  </select>
                                  <div
                                    className="pointer-events-none absolute inset-y-0
                               right-0 flex items-center px-2 text-gray-700"
                                  >
                                    <svg
                                      className="fill-current h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              {/* Section */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide
                               text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-section"
                                >
                                  Section
                                </label>
                                <div className="relative">
                                  <select
                                    className="block appearance-none w-full
                                 bg-gray-200 border border-gray-200
                                  text-gray-700 py-3 px-4 pr-8 rounded 
                                  leading-tight focus:outline-none focus:bg-white
                                   focus:border-gray-500"
                                    id="grid-section"
                                    value={data.section}
                                    onClick={(e) => {
                                      setError("");
                                    }}
                                    onChange={handleChange}
                                    name="section"
                                  >
                                    <option>Select</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                  </select>
                                  <div
                                    className="pointer-events-none absolute inset-y-0
                               right-0 flex items-center px-2 text-gray-700"
                                  >
                                    <svg
                                      className="fill-current h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-row -mx-3">
                              {/* Batch */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide
                               text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-Batch"
                                >
                                  Batch
                                </label>
                                <div className="relative">
                                  <select
                                    className="block appearance-none w-full
                                 bg-gray-200 border border-gray-200
                                  text-gray-700 py-3 px-4 pr-8 rounded 
                                  leading-tight focus:outline-none focus:bg-white
                                   focus:border-gray-500"
                                    id="grid-Batch"
                                    value={data.batch}
                                    onChange={handleChange}
                                    onClick={(e) => {
                                      setError("");
                                    }}
                                    name="batch"
                                  >
                                    <option>Select</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                  </select>
                                  <div
                                    className="pointer-events-none absolute inset-y-0
                               right-0 flex items-center px-2 text-gray-700"
                                  >
                                    <svg
                                      className="fill-current h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              {/* Date of Birth */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                  htmlFor="grid-name"
                                >
                                  Date of Birth
                                </label>
                                <input
                                  className="appearance-none block w-full bg-gray-200
                               text-gray-700 border rounded
                                py-3 px-4 mb-3 leading-tight focus:outline-none
                                 focus:bg-white"
                                  id="grid-dob"
                                  value={data.dob}
                                  onChange={handleChange}
                                  onClick={(e) => {
                                    setError("");
                                  }}
                                  name="dob"
                                  type="text"
                                  placeholder="07/03/2003"
                                />
                                {/* <p className="text-red-500 text-xs italic">
                              Please fill out this field.
                            </p> */}
                              </div>
                            </div>
                            {/* Password */}
                            <div className="w-full mt-4 mb-3 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Password
                              </label>
                              {/* border-red-500 */}
                              <input
                                className="appearance-none block w-full bg-gray-200
                               text-gray-700 border  rounded
                                py-3 px-4 mb-2 leading-tight focus:outline-none
                                 focus:bg-white"
                                id="grid-password"
                                type="password"
                                onClick={(e) => {
                                  setError("");
                                }}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Password"
                              />
                              {/* <p class="text-red-500 text-xs italic">
                              Please fill out this field.
                            </p> */}
                            </div>
                            <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:-mx-6 sm:px-6">
                              <button
                                type="submit"
                                className="mt-3 inline-flex w-full justify-center rounded-md border
                 border-gray-300 bg-dark-purple opacity-70 text-white 
                 px-6 py-2 text-base font-medium shadow-sm
                  hover:bg-gray-600 focus:outline-none focus:ring-2
                   focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3
                    sm:w-auto sm:text-sm"
                              >
                                Add
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col items-center w-full pt-8">
      {a && <AddStudentModel />}
      <h1
        className="text-3xl flex justify-start w-10/12 mb-5 font-semibold
      text-dark-purple
      "
      >
        Students
      </h1>
      {/* basic details of Students */}
      <div className="w-full flex justify-center">
        <div
          className="flex flex-col md:flex-row items-center
         w-9/12 justify-between"
        >
          <div className="flex items-center mb-4 md:mb-0">
            <label htmlFor="batch" className="mr-3">
              Batch:
            </label>
            <textarea
              className="outline-none py-1 px-2 rounded bg-white
                cursor-not-allowed resize-none"
              rows={1}
              name="batch"
              id="batch"
              value={details.batch}
              readOnly
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="Dept_&_sec" className="mr-3">
              Class:{" "}
            </label>
            <textarea
              className="outline-none py-1 px-2 rounded bg-white
                cursor-not-allowed resize-none"
              rows={1}
              name="Dept_&_sec"
              id="Dept_&_sec"
              value={`${details.degree} - ${details.section}`}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* feedbacks */}
      <div className=" w-9/12 flex flex-row justify-between items-center">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        {/* add students */}
        <div className="bg-green-400 rounded-lg mt-5">
          <button
            onClick={() => {
              setA(true);
            }}
            className="px-4 py-2 text-white"
          >
            Add Student
          </button>
        </div>
      </div>
      {/* table */}
      <div className="w-full flex justify-center">
        <table
          className="divide-y mt-7 m-10 w-3/4 divide-gray-200"
          {...getTableProps()}
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup, idx) => (
              <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className="px-8 py-3 text-center text-xs font-medium
                text-gray-500 uppercase"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200"
            {...getTableBodyProps()}
          >
            {rows.map((row, idx) => {
              prepareRow(row);

              return (
                <tr
                  key={idx}
                  {...row.getRowProps()}
                  className={
                    isEven(idx)
                      ? "bg-dark-purple bg-opacity-30"
                      : "bg-light-white bg-opacity-30"
                  }
                >
                  {row.cells.map((cell, id) => (
                    <td
                      key={id}
                      className={`px-6 py-4 text-center`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// const Students = ( ) => {
//   return (
//     <div>students</div>
//   )
// }

export default Students;
