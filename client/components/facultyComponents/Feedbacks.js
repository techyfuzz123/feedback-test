const Feedbacks = ({ feedbacks }) => {
  return (
    <div className="flex flex-col items-center w-full pt-8">
      {/* basic details of feedbacks */}
      <div className="w-full flex justify-center">
        <div className="flex flex-col md:flex-row items-center w-3/4 justify-around">
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
      <div className="w-full  flex justify-center">
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
      </div>
    </div>
  );
};

export default Feedbacks;
