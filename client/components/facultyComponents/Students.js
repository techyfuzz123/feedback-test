import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "../GlobalFilter";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [details, setDetails] = useState({})
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchFeedbacks = async () => {
    const response = await fetch(url + "/staff/students", {
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
        if (status === 401) return "not 200 status";
        return data;
      });

    if (response) {
      const students = response;
      const details = students[0]
      setStudents(students);
      setDetails(details)
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

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <div className="flex flex-col items-center w-full pt-8">
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

export default Students;
