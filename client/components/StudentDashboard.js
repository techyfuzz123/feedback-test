import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { studentLogout } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [feedback, setFeedback] = useState({
    batch: "",
    section: "",
    degree: "",
    semester: "",
  });
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchSubjects = async () => {
    const response = await fetch(url + "/student/feedback", {
      method: "GET",
      credentials: "include",
    })
      .then(async function (res) {
        const value = {
          status: res.status,
          data: await res.json(),
        };
        return value;
      })
      .then(function ({ status, data }) {
        if (status != 200) return "not 200 status";
        return data.feedback;
      });

    if (response) {
      const subjects = response.subjects;
      subjects.map((subject) => {
        (subject["subjectKnowledge"] = 1),
          (subject["clearExplanation"] = -1),
          (subject["usageOfTeachingTools"] = -1),
          (subject["extraInput"] = -1),
          (subject["teacherStudentRelationship"] = -1);
      });

      setSubjects(subjects);
      setFeedback(response);
    }
  };

  console.log(feedback);

  const dropdown = ({  column, row, data }) => {
    const handleChange = (value) => {
      let newValues = subjects;
      newValues.map((subject) => {
        if (subject.subjectCode === data[row.index].subjectCode) {
          subject[column.id] = Number(value);
        }
      });
      setSubjects(newValues);
      sessionStorage.setItem("subjects", JSON.stringify(subjects));
    };
    return (
      <select
        // value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`outline-none text-center bg-inherit`}
      >
        <option>{"select"}</option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    );
  };
  const subjectsData = useMemo(() => [...subjects], [subjects]);
  const subjectsColumns = useMemo(
    () => [
      {
        Header: "faculty",
        accessor: "faculty",
      },
      {
        Header: "Name of the Subjects",
        accessor: "subjectName",
      },
      {
        Header: "Subject Knowledge",
        accessor: "subjectKnowledge",
        Cell: dropdown,
      },
      {
        Header: "Clear Explanation",
        accessor: "clearExplanation",
        Cell: dropdown,
      },
      {
        Header: "Usage of Teaching Tools",
        accessor: "usageOfTeachingTools",
        Cell: dropdown,
      },
      {
        Header: "Extra Input",
        accessor: "extraInput",
        Cell: dropdown,
      },
      {
        Header: "Teacher-Student Relationship",
        accessor: "teacherStudentRelationship",
        Cell: dropdown,
      },
    ],
    [subjects]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      // {
      //   id: "",
      //   Header: "Edit",
      //   Cell: ({ row }) => (
      //     <button onClick={() => alert(row.values.faculty)}>Edit</button>
      //   ),
      // },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: subjectsColumns,
      data: subjectsData,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    fetchSubjects();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <div className="flex flex-col items-center w-full pt-8">
      <div className="w-10/12 flex justify-between items-center">
        <h1
          className="text-2xl md:text-3xl py-1.5 
           mb-5 font-semibold text-dark-purple
      "
        >
          Feedback
        </h1>
        <button
          className="text-1xl md:text-2xl py-1.5 rounded-lg px-10 mr-10 bg-green-500
          items-center mb-5 font-semibold  text-white shadow"
          onClick={studentLogout}
        >
          Logout
        </button>
      </div>

      {/* basic details of feedback */}
      <div className="w-full flex justify-center">
        <div
          className="flex flex-col md:flex-row items-center
         w-10/12 justify-evenly"
        >
          <div className="flex items-center mb-4 md:mb-0 md:ml-2">
            <label htmlFor="batch" className="mr-3">
              Batch:
            </label>
            <input
              className="outline-none py-1 px-2 rounded bg-white
                cursor-not-allowed"
              type="text"
              name="batch"
              onChange={(e) => {}}
              id="batch"
              value={feedback.batch}
              readOnly
            />
          </div>

          <div className="flex items-center mb-4 md:mb-0 md:ml-2">
            <label htmlFor="Dept_&_sec" className="mr-3">
              Class:{" "}
            </label>
            <input
              className="outline-none px-2 py-1 rounded bg-white 
               cursor-not-allowed"
              type="text"
              name="Dept_&_sec"
              onChange={(e) => {}}
              id="Dept_&_sec"
              value={`${feedback.degree} - ${feedback.section}`}
              readOnly
            />
          </div>

          <div className="flex items-center mb-4 md:mb-0 md:ml-2">
            <label htmlFor="Dept_&_sec" className="mr-3">
              Semester:{" "}
            </label>
            <input
              className="outline-none px-2 py-1 rounded bg-white 
               cursor-not-allowed"
              type="text"
              name="Dept_&_sec"
              id="Dept_&_sec"
              onChange={(e) => {}}
              value={feedback.semester}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* table */}
      <div className="w-full flex justify-center">
        <table
          className="divide-y m-10 w-3/4 divide-gray-200"
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
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
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
                      className={`px-6 py-4 text-center outline-none`}
                      {...cell.getCellProps()}
                    >
                      <span className={``}>{cell.render("Cell")}</span>
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
export default StudentDashboard;
