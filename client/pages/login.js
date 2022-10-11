import Head from "next/head";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <Head>
        <title>Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="flex bg-gray-50 mx-auto min-h-screen flex-col items-center justify-center py-2">
          <section className=" min-h-screen flex items-center justify-center">
            {/* login container  */}
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
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
              <div className="md:w-1/2 px-8 md:px-16">
                <h2 className="font-bold text-2xl text-[#002D74]">
                  Student Login
                </h2>

                <form action="" className="flex flex-col gap-4">
                  <input
                    className="p-2 mt-8 rounded-xl border"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />

                  <div className="relative">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <input
                    className="p-2 mt-8 rounded-xl border"
                    type="date"
                    name="DOB"
                    placeholder=""
                  />

                  <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
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

// {/* <div className="flex bg-gray-50 mx-auto min-h-screen flex-col items-center justify-center py-2">
//         <body>
//           <section className=" min-h-screen flex items-center justify-center">
//             {/* login container  */}
//             <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
//               {/* image */}
//               <div className="md:block hidden w-1/2">
//                 <Image
//                   className="rounded-2xl"
//                   width="510"
//                   height="685"
//                   src="/img2.svg"
//                 />
//               </div>

//               {/* form  */}
//               <div className="md:w-1/2 px-8 md:px-16">
//                 <h2 className="font-bold text-2xl text-[#002D74]">
//                   Student Login
//                 </h2>

//                 <form action="" className="flex flex-col gap-4">
//                   <input
//                     className="p-2 mt-8 rounded-xl border"
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                   />

//                   <div className="relative">
//                     <input
//                       className="p-2 rounded-xl border w-full"
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                     />
//                   </div>
//                   <input
//                     className="p-2 mt-8 rounded-xl border"
//                     type="date"
//                     name="DOB"
//                     placeholder=""
//                   />

//                   <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
//                     Login
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </section>
//         </body>
//       </div> */}
