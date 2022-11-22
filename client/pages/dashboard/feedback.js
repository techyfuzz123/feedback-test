import React, { Fragment, useEffect, useMemo, useState } from "react";
import UseFetch from "@hooks/useFetch";
import { useRouter } from "next/router";
import ReadOnlyRow from "@facultyComponents/ReadOnlyRow";
import EditableRow from "@facultyComponents/EditableRow";
import Loading from "@components/Loading";

const Feedback = () => {
  const [subjects, setSubjects] = useState([]);
  const [details, setDetails] = useState({});
  const [addSubjectModel, setAddSubjectModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const departments = [
    "AERO",
    "AGRI",
    "AIML",
    "AME",
    "BME",
    "CAM",
    "CHE",
    "CIVIL",
    "CSE",
    "ECE",
    "EEE",
    "EIE",
    "ES",
    "FT",
    "IT",
    "MBA",
    "MCA",
    "MECH",
    "MECHAT",
  ];
  const facultyPositions = [
    "Associate Professor",
    "Professor",
    "Professor and Head",
    "IBM Trainee",
  ];
  const router = useRouter();
  let urlParams, queryString, semester, feedbackNo;
  useEffect(() => {
    // Client-side-only code

    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    semester = urlParams.get("s");
    feedbackNo = urlParams.get("f");
  });

  const fetchSubjects = async () => {
    const body = {
      semester: semester,
      feedbackNo: feedbackNo,
    };
    const response = await UseFetch("POST", "/staff/feedback", body).then(
      async function ({ status, data }) {
        if (status === 401 || status === 409 || status === 404) {
          router.push("/");
          return;
        }
        if (data.isLive) {
          data.isLive = "Active";
        } else {
          data.isLive = "InActive";
        }
        return data;
      }
    );

    if (response) {
      const subjects = response.subjects;
      const details = response;
      setSubjects(subjects);
      setDetails(details);
    }
  };
  const subjectsData = useMemo(() => [...subjects], [subjects]);
  const subjectsColumns = useMemo(() => {
    const s = subjects[0]
      ? Object.keys(subjects[0])
          .filter((key) => key !== "_id")
          .filter((key) => key !== "semester")
          .filter((key) => key !== "feedbackNo")
          .map((key) => {
            return { Header: key, accessor: key };
          })
      : [];
    s.push({
      Header: "actions",
      accessor: "actions",
    });
    return s;
  }, [subjects]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setDetails({ ...details, [input.name]: input.value });
  };

  const updateFeedback = async (e) => {
    e.preventDefault();

    const feedback = {
      semester: details.semester,
      feedbackNo: details.feedbackNo,
      isLive: details.isLive === "Active",
      subjects: [...subjects],
    };

    const response = UseFetch("POST", "/feedback/staff/update", feedback).then(
      ({ status, data }) => {
        if (status === 401) {
          router.push("/");
          return "not 200 status";
        } else if (status === 409) {
          return { eMessage: data.eMessage, path: "updateFeedback" };
        } else if (status === 200) {
          return { Message: "feedback updated", path: "updateFeedback" };
        } else if (status != 200) {
          setError(data.eMessage);
          return data;
        }
      }
    );
  };

  const AddSubjectModel = () => {
    const [data, setData] = useState({
      subjectCode: "25936187",
      subjectName: "programming for you",
      faculty: "sajja",
      facultyPosition: "Associate Professor",
      facultyDepartment: "CSE",
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };

    const addSubject = async (newSubject) => {
      setLoading(true);
      let newSubjects;

      newSubjects = [...subjects, newSubject];

      // const newSubjects = [];
      // const map = new Map();
      // for (const subject of subs) {
      //   if (!map.has(subject.subjectCode)) {
      //     map.set(subject.subjectCode, true); // set any value to Map
      //     newSubjects.push({
      //       subjectCode: subject.subjectCode,
      //       subjectName: subject.subjectName,
      //       faculty: subject.faculty,
      //       facultyPosition: subject.facultyPosition,
      //       facultyDepartment: subject.facultyDepartment,
      //     });
      //   }
      // }

      setSubjects(newSubjects);
      setAddSubjectModel(false);

      // const body = [
      //   {
      //     subjectCode: data.subjectCode.toUpperCase(),
      //     subjectName: data.subjectName,
      //     faculty: data.faculty,
      //     facultyPosition: data.facultyPosition,
      //     facultyDepartment: data.facultyDepartment,
      //     semester: details.semester,
      //     feedbackNo: details.feedbackNo,
      //   },
      // ];

      // let response = { eMessage: "no value received", path: "addsubject" };

      // response = await UseFetch("POST", "/feedback/staff/subject", body).then(
      //   async function ({ status, data }) {
      //     if (status != 200) {
      //       setError(data.eMessage);
      //       return data;
      //     }
      //     if (status === 200) {
      //       setAddSubjectModel(false);
      //       return { Message: "student added", path: "addstudent" };
      //     }
      //     if (status === 409) {
      //       return { eMessage: data.eMessage, path: "addstudent" };
      //     }
      //   }
      // );

      setLoading(false);
      // return response;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      if (
        !data.subjectCode ||
        !data.subjectName ||
        !data.faculty ||
        data.facultyPosition == "" ||
        data.facultyPosition == "Select" ||
        data.facultyDepartment == "" ||
        data.facultyDepartment == "Select"
      ) {
        setError("all fields should be filled");
        return;
      }
      if (data.subjectCode.length < 8) {
        setError("Subject Code should have 8 characters");
        return;
      }
      if (data.subjectName.length < 8) {
        setError("Subject Name should have 5 characters");
        return;
      }

      const newSubject = {
        subjectCode: data.subjectCode.toUpperCase(),
        subjectName: data.subjectName,
        faculty: data.faculty,
        facultyPosition: data.facultyPosition,
        facultyDepartment: data.facultyDepartment,
      };

      const alreadyExists = false;

      subjects.map((subject) => {
        if (subject.subjectCode === newSubject.subjectCode) {
          alreadyExists = true;
          return;
        }
      });
      if (alreadyExists) {
        setError("Already Exists");
        return;
      }

      await addSubject(newSubject);

      // fetchSubjects();
    };

    return (
      <>
        {loading ? (
          <Loading light={true} />
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
                            Add Subject
                          </h3>
                          <span
                            className="text-2xl text-dark-purple cursor-pointer
                             mr-1"
                            onClick={() => {
                              setAddSubjectModel(false);
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
                              {/* Subject Code */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                  htmlFor="grid-subject-code"
                                >
                                  subject code
                                </label>
                                <input
                                  className="appearance-none block w-full bg-gray-200
                               text-gray-700 border  rounded
                                py-3 px-4 mb-3 leading-tight focus:outline-none
                                 focus:bg-white"
                                  id="grid-subject-code"
                                  value={data.subjectCode}
                                  onClick={(e) => {
                                    setError("");
                                  }}
                                  onChange={handleChange}
                                  name="subjectCode"
                                  type="text"
                                  placeholder="19AA1234"
                                />
                              </div>

                              {/* Subject Name */}
                              <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                  htmlFor="grid-subject-name"
                                >
                                  subject Name
                                </label>
                                <input
                                  className="appearance-none block w-full bg-gray-200
                               text-gray-700 border rounded
                                py-3 px-4 mb-3 leading-tight focus:outline-none
                                 focus:bg-white"
                                  id="grid-subject-name"
                                  value={data.subjectName}
                                  onChange={handleChange}
                                  onClick={(e) => {
                                    setError(null);
                                  }}
                                  name="subjectName"
                                  type="text"
                                  placeholder="Programming"
                                />
                                {/* <p className="text-red-500 text-xs italic">
                              Please fill out this field.
                            </p> */}
                              </div>
                            </div>

                            <div className="flex flex-row -mx-3 mb-3">
                              {/* Faculty Name */}
                              <div className="w-full px-3 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide text-gray-700
                               text-xs font-bold mb-2"
                                  htmlFor="grid-faculty-name"
                                >
                                  faculty Name
                                </label>
                                <input
                                  className="appearance-none block w-full bg-gray-200
                               text-gray-700 border rounded
                                py-3 px-4 mb-3 leading-tight focus:outline-none
                                 focus:bg-white"
                                  id="grid-faculty-name"
                                  value={data.faculty}
                                  onChange={handleChange}
                                  onClick={(e) => {
                                    setError(null);
                                  }}
                                  name="faculty"
                                  type="text"
                                  placeholder="Jack"
                                />
                              </div>

                              {/* Faculty Position */}
                              <div className="w-full px-3 md:mb-0">
                                <label
                                  className="block uppercase tracking-wide
                               text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-faculty-position"
                                >
                                  faculty Position
                                </label>
                                <div className="relative">
                                  <select
                                    className="block appearance-none w-full
                                 bg-gray-200 border border-gray-200
                                  text-gray-700 py-3 px-4 pr-8 rounded 
                                  leading-tight focus:outline-none focus:bg-white
                                   focus:border-gray-500"
                                    id="grid-faculty-position"
                                    value={data.facultyPosition}
                                    onClick={(e) => {
                                      setError(null);
                                    }}
                                    onChange={handleChange}
                                    name="facultyPosition"
                                  >
                                    <option>Select</option>
                                    {facultyPositions.map(
                                      (facultyPosition, idx) => (
                                        <option key={idx}>
                                          {facultyPosition}
                                        </option>
                                      )
                                    )}
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

                            <div className="flex flex-row mb-3 -mx-3">
                              {/* Faculty Department */}
                              <div className="w-full px-3  md:mb-0">
                                <label
                                  className="block uppercase tracking-wide
                               text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-faculty-department"
                                >
                                  Faculty Department
                                </label>
                                <div className="relative">
                                  <select
                                    className="block appearance-none w-full
                                 bg-gray-200 border border-gray-200
                                  text-gray-700 py-3 px-4 pr-8 rounded 
                                  leading-tight focus:outline-none focus:bg-white
                                   focus:border-gray-500"
                                    id="grid-faculty-department"
                                    value={data.facultyDepartment}
                                    onChange={handleChange}
                                    onClick={() => {
                                      setError(null);
                                    }}
                                    name="facultyDepartment"
                                  >
                                    <option>Select</option>
                                    {departments.map((department, idx) => (
                                      <option key={idx}>{department}</option>
                                    ))}
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

  const SubjectsTable = () => {
    const [editFormData, setEditFormData] = useState({
      subjectCode: "",
      subjectName: "",
      faculty: "",
      facultyPosition: "",
      facultyDepartment: "",
      // _id: "",
    });

    const [editSubjectCode, setEditSubjectCode] = useState(null);

    const handleEditFormChange = (event) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;

      setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async (event) => {
      event.preventDefault();

      const editedSubject = {
        subjectCode: editFormData.subjectCode,
        subjectName: editFormData.subjectName,
        faculty: editFormData.faculty,
        facultyPosition: editFormData.facultyPosition,
        facultyDepartment: editFormData.facultyDepartment,
      };

      const newSubjects = subjects.map((subject) => {
        if (editSubjectCode === subject.subjectCode) {
          return editedSubject;
        } else {
          return subject;
        }
      });
      setSubjects(newSubjects);

      setEditSubjectCode(null);
      // fetchSubjects();
    };

    const handleEditClick = (event, subject) => {
      event.preventDefault();
      setEditSubjectCode(subject.subjectCode);

      const formValues = {
        subjectCode: subject.subjectCode,
        subjectName: subject.subjectName,
        faculty: subject.faculty,
        facultyPosition: subject.facultyPosition,
        facultyDepartment: subject.facultyDepartment,
      };

      setEditFormData(formValues);
    };

    const handleCancelClick = () => {
      setEditSubjectCode(null);
    };

    const handleDeleteClick = async (deleteSubject) => {
      const newSubjects = subjects.filter((subject) => {
        if (deleteSubject.subjectCode != subject.subjectCode) {
          return subject;
        }
      });
      setSubjects(newSubjects);
    };

    return (
      <div className="w-full flex flex-col justify-center">
        {/* add btn */}
        <div className="w-full flex justify-end ">
          <button
            className="bg-dark-purple bg-opacity-30 
        py-2 px-4 rounded text-white shadow-md
        "
            onClick={() => {
              setAddSubjectModel(true);
            }}
          >
            Add Subject
          </button>
        </div>
        <form
          className="w-full flex justify-center"
          onSubmit={handleEditFormSubmit}
        >
          <table className="w-full divide-y my-10  divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {subjectsColumns.map((column, idx) => {
                  return (
                    <th
                      key={idx}
                      className="px-8 py-3 text-center text-xs font-medium
                text-gray-500 uppercase"
                    >
                      {column.Header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjectsData.map((subject, idx) => (
                <Fragment key={idx}>
                  {editSubjectCode === subject.subjectCode ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      idx={idx}
                      departments={departments}
                      facultyPositions={facultyPositions}
                    />
                  ) : (
                    <ReadOnlyRow
                      idx={idx}
                      subject={subject}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full pt-8">
      <h1
        className="text-3xl flex justify-start w-9/12 mb-5 font-semibold
        text-dark-purple
        "
      >
        Feedback
      </h1>

      {addSubjectModel ? <AddSubjectModel /> : ""}

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

          <div className="flex h-full items-start ">
            <div className="flex items-center mb-4">
              <label htmlFor="isLive" className="mr-3">
                isLive:
              </label>
              <div className="w-full px-3  md:mb-0">
                <div className="relative">
                  <select
                    className="block text-center appearance-none w-full
                                 bg-white border border-gray-200
                                  text-gray-700 py-3 px-4 pr-8 rounded 
                                  leading-tight focus:outline-none focus:bg-white
                                   focus:border-gray-500"
                    value={details.isLive}
                    onChange={handleChange}
                    name="isLive"
                  >
                    <option>InActive</option>
                    <option>Active</option>
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
          </div>
        </div>
      </div>

      <div className="w-9/12">
        <SubjectsTable />
      </div>

      {/* update btn */}
      <form onSubmit={updateFeedback} className="w-9/12 flex justify-end">
        <button
          className="bg-dark-purple bg-opacity-30 
        py-2 px-4 rounded text-white shadow-md
        "
          type="submit"
        >
          update
        </button>
      </form>
    </div>
  );
};

export default Feedback;
