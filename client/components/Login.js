import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { login, error, isLoading } = useLogin();

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("incorrect email or password");
      }
      return;
    }

    await signup(email, password);
  }

  return (
    <div
      className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center
    gap-2 sm:gap-4"
    >
      <h1
        className="font-bold select-none text-2xl sm:text-4xl
      uppercase"
      >
        {isLoggingIn ? "LOGIN" : "REGISTER"}
      </h1>
      {error && (
        <div
          className="w-full max-w-[40ch] border border-solid text-center
       border-rose-400 text-rose-400 py-2"
        >
          {error}
        </div>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="outline-none text-slate-900 p-2 w-full
       max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="outline-none text-slate-900 p-2 w-full
       max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
      />
      <button
        onClick={submitHandler}
        className="w-full max-w-[40ch] border border-white border-solid uppercase py-2
        relative after:absolute after:top-0 after:right-full after:bg-white after:z-10
       after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300
       hover:text-slate-900"
      >
        <h2 className="relative z-20">SUBMIT</h2>
      </button>
      <h2
        onClick={() => {
          setIsLoggingIn(!isLoggingIn);
          setEmail("");
          setPassword("");
        }}
        className="select-none duration-300
       hover:scale-110 cursor-pointer"
      >
        {!isLoggingIn ? "LOGIN" : "REGISTER"}
      </h2>
    </div>
  );
}
