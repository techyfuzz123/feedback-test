import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { GlobalFilter } from "../GlobalFilter";

const Feedbacks = () => {
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products").then(
      async function (res) {
        return res.json();
      }
    );

    const response2 = await fetch(url + "/staff/feedbacks").then(
      async function (res) {
        return res.json();
      }
    );

    if (response) {
      const products = response;

      console.log("Products: ", products);
      setProducts(products);
    }
    if (response2) {
      const feedbacks = response;

      console.log("feedbacks: ", feedbacks);
      setFeedbacks(feedbacks);
    }
  };

  const productsData = useMemo(() => [...products], [products]);
  const feedbacksData = useMemo(() => [...feedbacks], [feedbacks]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} />,
                  maxWidth: 70,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );
  const feedbacksColumns = useMemo(
    () =>
      feedbacks[0]
        ? Object.keys(feedbacks[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img src={value} />,
                  maxWidth: 70,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => alert("Editing: " + row.values.price)}>
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
    fetchProducts();
  }, []);

  const isEven = (idx) => idx % 2 === 0;
  return (
    <div className="flex flex-col items-center w-full pt-8">
      {/* basic details of feedbacks */}
      <div className="w-full flex justify-center">
        <div
          className="flex flex-col md:flex-row items-center
         w-10/12 justify-between"
        >
          {/* batch  */}
          <div className="flex items-center mb-4 md:mb-0">
            <label htmlFor="batch" className="mr-3">
              Batch:
            </label>
            <input
              className="outline-none py-1 px-2 rounded bg-white
                cursor-not-allowed"
              type="text"
              name="batch"
              id="batch"
              value={feedbacks[0].batch}
              readOnly
            />
          </div>

          {/* class  */}
          <div className="flex items-center">
            <label htmlFor="Dept_&_sec" className="mr-3">
              Class:{" "}
            </label>
            <input
              className="outline-none px-2 py-1 rounded bg-white 
               cursor-not-allowed"
              type="text"
              name="Dept_&_sec"
              id="Dept_&_sec"
              value={`${feedbacks[0].degree} - ${feedbacks[0].section}`}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* feedbacks */}
      {/* <div className="w-full  flex justify-center">
        <table className="divide-y m-10 w-3/4 divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium
                text-gray-500 uppercase tracking-wider"
              >
                semester
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium
                text-gray-500 uppercase tracking-wider"
              >
                feedback NO
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium 
                text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {feedback.semester}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {feedback.feedbackNo ? feedback.feedbackNo : "-"}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className="px-2 inline-flex text-xs justify-center
                      font-semibold rounded-full"
                  >
                    {feedback.isLive ? (
                      <span className="bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800">InActive</span>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className=" w-10/12 flex flex-row justify-between items-center">
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
                  className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
                >
                  {row.cells.map((cell, idx) => (
                    <td
                      key={idx}
                      className="px-6 py-4 text-center"
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
