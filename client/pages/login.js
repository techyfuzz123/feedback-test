import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { loadUser } from "../hooks/loadUser";

const Login = () => {
  const [regNo, setRegNo] = useState(9999999);
  const [dob, setDob] = useState("07-03-2003");
  const [password, setPassword] = useState("hicet");
  const { login } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    const user = loadUser();
    if (user) {
      router.push("/");
    }
  }, []);

  // useEffect(() => {
  //   console.log(user);
  //   if (user) {
  //     router.push("/");
  //   }
  // },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(regNo, dob, password);
  };

  return (
    <>
      <div className="flex  min-h-screen flex-col items-center justify-center py-2">
        <section className="flex items-center justify-center">
          {/* login container  */}
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 justify-around items-center">
            {/* image */}
            <div className="md:block hidden w-1/2">
              <Image
                className="rounded-2xl"
                width="510"
                height="685"
                src="/img2.svg"
              />
            </div>

            {/* form  */}
            <div className="md:w-1/2 px-8 md:px-10">
              <h2 className="font-bold text-2xl  text-[#002D74]">
                Student Login
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* {error && <div className="text-red-500">{error}</div>} */}

                <input
                  className="p-2 mt-8 rounded-xl border"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={regNo}
                  onChange={(e) => {
                    setRegNo(e.target.value);
                  }}
                />

                <div className="relative">
                  <input
                    className="p-2 rounded-xl border w-full"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <input
                  className="p-2 mt-8 rounded-xl border"
                  type="text"
                  name="DOB"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />

                <button
                  // disabled={isLoading || isLoggedin}
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
