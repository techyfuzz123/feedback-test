import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [regNo, setRegNo] = useState(22222);
  const [dob, setDob] = useState("07/03/2003");
  const [password, setPassword] = useState("hicet");
  const [error, setError] = useState("");
  const { login, errorMsg } = useAuth();

  const handlelogin = async () => {
    setError("");
    await login(regNo, dob, password);
  };
  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  // * Validating and submiting the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!regNo || !dob || !password) {
      setError("all fields should be filled");
      return;
    }
    if (!Number(regNo)) {
      setError("register number should be numerical value");
      return;
    }
    if (
      !/([0-2]{1}[0-9]{1}|3[0-1]{1})[/](0[1-9]|1[0-2])[/]([0-9]{4})/.test(dob)
    ) {
      setError("date should be in the format dd/mm/yyyy");
      return;
    }
    if (password.length >= 10 || password.length < 5) {
      setError("password must be between 5 to 10 characters");
      return;
    }
    handlelogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex max-h-screen items-center max-w-sm md:max-w-3xl justify-center">
        <div className="flex items-center bg-gray-300 rounded-2xl shadow-lg">
          {/* image */}
          <div className="md:block hidden py-3 pl-3 w-1/2">
            <Image
              className="rounded-2xl"
              width="510"
              height="685"
              src="/img2.svg"
            />
          </div>

          {/* form  */}
          <div className="md:w-1/2  p-8 md:px-10">
            <h2 className="font-bold text-2xl  text-[#002D74]">
              Student Login
            </h2>

            <div className="text-gray-800">
              {error && <div className="text-red-500 pt-2">{error}</div>}

              <div>
                <p className="mt-5 mb-1">Register Number</p>
                <input
                  className="p-2 w-full outline-none rounded-lg border"
                  type="text"
                  name="regNo"
                  value={regNo}
                  placeholder="123"
                  onClick={(e) => {
                    setError("");
                  }}
                  onChange={(e) => {
                    setRegNo(e.target.value);
                  }}
                />
              </div>

              <div>
                <p className="mt-5 mb-1">Date of Birth</p>
                <input
                  className="p-2 w-full outline-none rounded-lg border"
                  type="text"
                  name="dob"
                  value={dob}
                  placeholder="dd/mm/yyyy"
                  onClick={(e) => {
                    setError("");
                  }}
                  onChange={(e) => {
                    setError("");
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div>
                <p className="mt-5 mb-1">Password</p>
                <input
                  className="p-2 rounded-lg outline-none w-full border"
                  type="password"
                  name="password"
                  placeholder="abc"
                  value={password}
                  onClick={(e) => {
                    setError("");
                  }}
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#002D74] mt-7 w-full rounded-xl text-white py-2.5 hover:scale-105 duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
