import { createContext, useState } from "react";
import instance from "../utils/axios-instance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const login = async (regNo, dob, password) => {
    setLoading(true);

    const body = {
      regNo: regNo,
      dob: dob,
      password: password,
    };

    let data;
    let success = false;
    const response = await instance
      .post(`/auth/login`, body)
      .then((res) => {
        data = res.data;
        if (res.status == 200) {
          success = true;
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    let success = false;
    const response = await instance
      .post(`/auth/logout`)
      .then((res) => {
        if (res.status == 200) {
          success = true;
          sessionStorage.removeItem("user");
        }
      })
      .catch((err) => {
        console.log(err.response.status);
      });
    setLoading(false);
  };

  const value = {
    login,
    logout,
  };

  return (
    // TODO: ...state, dispatch
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
