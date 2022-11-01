import React, { useMemo } from "react";
import { useTable } from "react-table";

export const TableInput = (props) => {
  sessionStorage.setItem("data", JSON.stringify(props.data));
  sessionStorage.setItem("column", JSON.stringify(props.column));
  const { column, row, cell, updateData } = props;
  const onChange = (e) => updateData(row.index, column.id, e.target.value);
  return <input type="number" value={cell.value} onChange={onChange} />;
};

export const ReactTable = React.memo((props) => {
  const { setAmountDue } = props;
  const columns = useMemo(
    () => [
      {
        Header: "Cost (DASH)",
        accessor: "cost",
        Cell: TableInput,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: TableInput,
      },
      {
        Header: "Total (DASH)",
        accessor: (row) => row.cost * row.quantity,
        id: "total",
      },
    ],
    []
  );
  const initialData = [
    {
      cost: 1,
      quantity: 2,
    },
    {
      cost: 3,
      quantity: 4,
    },
  ];
  const [data, setData] = React.useState(initialData);
  const resetData = () => setData(initialData);
  const addRow = () => setData((old) => [...old, { cost: 5, quantity: 6 }]);
  const updateData = (rowIndex, columnID, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: value,
          };
        }
        return row;
      })
    );
  };
  const table = useTable({ columns, data, updateData });
  const { getTableProps, headerGroups, rows, prepareRow } = table;
  const tableSum = rows.reduce((sum, row) => sum + row.values.total, 0);
  console.log("setAmountDue", tableSum);
  setAmountDue(tableSum);
  return (
    <>
      <label>Itemized Costs:</label>
      <br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={3}>
              <button type="button" onClick={addRow}>
                Add Row
              </button>
              <button type="button" onClick={resetData}>
                Reset Table
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
});

const Accounts = () => {
  const [amountDue, setAmountDue] = React.useState(0);
  return (
    <div className="w-full flex items-center justify-center">
      <ReactTable amountDue={amountDue} setAmountDue={setAmountDue} />
    </div>
  );
};

export default Accounts;
