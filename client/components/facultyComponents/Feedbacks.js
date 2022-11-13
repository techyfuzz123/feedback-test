import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "@components/GlobalFilter";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [details, setDetails] = useState({});
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const fetchFeedbacks = async () => {
    const response = await fetch(url + "/staff/feedbacks", {
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
        data.feedbacks.map((feedback) => {
          if (feedback.isLive) {
            feedback.isLive = "Active";
          } else {
            feedback.isLive = "InActive";
          }
        });
        return data.feedbacks;
      });

    if (response) {
      const feedbacks = response;
      const details = feedbacks[0];
      setFeedbacks(feedbacks);
      setDetails(details);
    }
  };

  const feedbacksData = useMemo(() => [...feedbacks], [feedbacks]);
  const feedbacksColumns = useMemo(
    () =>
      feedbacks[0]
        ? Object.keys(feedbacks[0])
            // .filter((key) => key !== "subjects")
            .map((key) => {
              if (key === "isLive")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => (
                    <span
                      className={`${
                        value === "Active"
                          ? "rounded p-0.5 bg-green-100 text-green-800"
                          : "rounded p-0.5 bg-red-100 text-red-800"
                      }`}
                    >
                      {value}
                    </span>
                  ),
                };
              return { Header: key, accessor: key };
            })
        : [],
    [feedbacks]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: () => (
          <button onClick={() => router.push("/dashboard/feedback")}>
            Edit
          </button>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: feedbacksColumns,
      data: feedbacksData,
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
        Feedbacks
      </h1>
      {/* basic details of feedbacks */}
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
        <button
          className="bg-blue-500 mt-10 hover:bg-blue-700 h-10
         text-white font-bold py-2 px-4 rounded-full"
        >
          Add Feedback
        </button>
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
    </div>
  );
};

export default Feedbacks;
