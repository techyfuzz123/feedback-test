import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

const Feedbacks = () => {
  const [subjects, setSubjects] = useState([]);
  const [details, setDetails] = useState({});
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchSubjects = async () => {
    const body = {
      semester: "V",
      feedbackNo: "I",
    };
    const response = await fetch(url + "/staff/feedback", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
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
        if (status === 401) return "not 200 status";
        if (data.isLive) {
          data.isLive = "Active";
        } else {
          data.isLive = "InActive";
        }
        return data;
      });

    if (response) {
      const subjects = response.subjects;
      const details = response;
      setSubjects(subjects);
      setDetails(details);
    }
  };

  const SubjectsData = useMemo(() => [...subjects], [subjects]);
  const SubjectsColumns = useMemo(
    () =>
      subjects[0]
        ? Object.keys(subjects[0])
            .filter((key) => key !== "_id")
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [subjects]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => alert(row.values.subjectCode)}>Edit</button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: SubjectsColumns,
      data: SubjectsData,
    },
    useGlobalFilter,
    useSortBy,
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
      <h1
        className="text-3xl flex justify-start w-9/12 mb-5 font-semibold
      text-dark-purple
      "
      >
        Feedback
      </h1>

      {/* basic details of feedback */}
      <div className="w-full flex justify-center">
        <div
          className="flex flex-col md:flex-row items-center
         w-9/12 justify-between"
        >
          <div className="">
            <div className="flex items-center mb-4">
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
                className="outline-none py-1 px-2 mb-5 md:mb-0 rounded bg-white
              cursor-not-allowed resize-none"
                rows={1}
                name="Dept_&_sec"
                id="Dept_&_sec"
                value={`${details.degree} - ${details.section}`}
                readOnly
              />
            </div>
          </div>

          <div className="">
            <div className="flex items-center mb-4">
              <label htmlFor="semester" className="mr-3">
                Semester:
              </label>
              <textarea
                className="outline-none py-1 px-2 rounded bg-white
                cursor-not-allowed resize-none"
                rows={1}
                name="semester"
                id="semester"
                value={details.semester}
                readOnly
              />
            </div>

            <div className="flex items-center mb-4 md:mb-0">
              <label htmlFor="feedbackNo" className="mr-3">
                Feedback Number:
              </label>
              <textarea
                className="outline-none py-1 px-2 rounded bg-white
                cursor-not-allowed resize-none"
                rows={1}
                name="feedbackNo"
                id="feedbackNo"
                value={details.feedbackNo}
                readOnly
              />
            </div>
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

      {/* update btn */}
      <div className="w-9/12 flex justify-end">
        <button
          className="bg-dark-purple bg-opacity-30 
        py-2 px-4 rounded text-white shadow-md
        "
          onClick={() => {
            console.log("object");
          }}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default Feedbacks;


