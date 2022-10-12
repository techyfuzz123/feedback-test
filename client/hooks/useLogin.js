import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import instance from "../utils/axios-instance";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (regNo, dob, password) => {
    setIsLoading(true);
    setIsLoggedin(false)
    setError(null);

    const body = {
      regNo: regNo,
      dob: dob,
      password: password,
    };

    const response = await instance
      .post(`/auth/login`, body)
      // .then((res) => console.log(res.data))
      .catch((err) =>{ return err.response.data});

    // const json = await response.json();
    

    if (response.statusText != "OK") {
      setIsLoading(false);
      setError(response.error);
    }

    dispatch({ type: "LOGIN", payload: response.data });
    console.log(response.data);
    setIsLoading(false);
    setIsLoggedin(true)
  };

  return { login, isLoading, error, isLoggedin };
};
