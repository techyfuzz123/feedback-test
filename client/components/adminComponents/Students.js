import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "@components/GlobalFilter";
import UseFetch from "@hooks/useFetch";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [batch, setBatch] = useState()
  const [degree, setDegree] = useState()
  const [section, setSection] = useState()
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchStudents = async () => {

    const body = {
      batch: batch,
      degree: degree,
      section: section
    }

    const response = await UseFetch("POST", "/staff/a/students", body).then(function ({
      status,
      data,
    }) {
      if (status === 401) return "not 200 status";
      return data;
    });

    if (response) {
      const students = response;
      setStudents(students);
    }
  };

      const handleSubmit = async (e) => {
      e.preventDefault();
      fetchStudents();
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
      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Degree",
        accessor: "degree",
      },
      {
        Header: "Section",
        accessor: "section",
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

  // useEffect(() => {
  //   fetchStudents();
  // }, []);

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

      <form onSubmit={handleSubmit} className=" w-9/12 flex flex-row justify-between  ">
        {/* Batch */}
      <div className="flex items-center mb-4 md:mb-0">
        <label
          className="block uppercase tracking-wide
        text-gray-700 text-xs font-bold mb-2 mr-2"
          htmlFor="grid-degree"
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
            id="grid-degree"
              name="degree"
              value={batch}
              onClick={(e)=>{setBatch(e.target.value)}}
              // ref={batchRef}
          >
            <option>Select</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
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

      {/* Degree */}
      <div className="flex items-center mb-4 md:mb-0">
        <label
          className="block uppercase tracking-wide
        text-gray-700 text-xs font-bold mb-2 mr-2"
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
              name="degree"
              value={degree}
              onClick={(e)=>{setDegree(e.target.value)}}
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
      <div className="flex items-center mb-4 md:mb-0">
        <label
          className="block uppercase tracking-wide
        text-gray-700 text-xs font-bold mb-2 mr-2"
          htmlFor="grid-degree"
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
            id="grid-degree"
              name="degree"
              value={section}
              onClick={(e)=>{setSection(e.target.value)}}
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
        
        <button type="submit" className="bg-green-500 rounded-lg text-white px-4 outline-none">Submit</button>
      </form>
      






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
