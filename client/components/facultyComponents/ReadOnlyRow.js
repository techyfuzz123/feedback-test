import React from "react";

const ReadOnlyRow = ({ subject, handleEditClick, handleDeleteClick, idx }) => {
  const isEven = (idx) => idx % 2 === 0;
  return (
    <tr
      className={
        isEven(idx)
          ? "bg-dark-purple bg-opacity-30"
          : "bg-light-white bg-opacity-30"
      }
    >
      <td className={`px-6 py-4 text-center`}>{subject.subjectCode}</td>
      <td className={`px-6 py-4 text-center`}>{subject.subjectName}</td>
      <td className={`px-6 py-4 text-center`}>{subject.faculty}</td>
      <td className={`px-6 py-4 text-center`}>{subject.facultyPosition}</td>
      <td className={`px-6 py-4 text-center`}>{subject.facultyDepartment}</td>
      <td className={`px-6 py-4 text-center`}>
        <button
          type="button"
          className="mr-2"
          onClick={(event) => handleEditClick(event, subject)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(subject)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
