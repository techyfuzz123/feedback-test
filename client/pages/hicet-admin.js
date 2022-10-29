import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const UserLogin = () => {
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("hicet");
  const [error, setError] = useState("");
  const router = useRouter();

  const { userLogin, errorMsg, fetchUser } = useAuth();

  const handlelogin = async () => {
    await userLogin(userName, password);
  };

  useEffect(() => {
    setError(errorMsg);
    const user = fetchUser();
    if (user) {
      router.push("/");
    }
  }, []);

  // * Validating and submiting the data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("all fields should be filled");
      return;
    }
    if (password.length >= 12 || password.length < 5) {
      setError("password must be between 5 to 10 characters");
      return;
    }
    handlelogin();
  };

  return (
    <>
      <div className="flex min-h-screen py-2 items-center max-w-sm md:max-w-3xl justify-center">
        <div className="flex items-center bg-gray-100 rounded-2xl shadow-lg">
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
            <h2 className="font-bold text-2xl  text-[#002D74]">Admin Login</h2>

            <form onSubmit={handleSubmit} className="text-gray-800">
              {error && <div className="text-red-500 pt-2">{error}</div>}

              <div>
                <p className="mt-5 mb-1">User Name</p>
                <input
                  className="p-2 w-full rounded-lg border"
                  type="text"
                  name="userName"
                  value={userName}
                  placeholder="abc"
                  onChange={(e) => {
                    setError("");
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div>
                <p className="mt-5 mb-1">Password</p>
                <input
                  className="p-2 rounded-lg w-full border"
                  type="password"
                  name="password"
                  placeholder="abc"
                  value={password}
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button className="bg-[#002D74] mt-7 w-full rounded-xl text-white py-2.5 hover:scale-105 duration-300">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
