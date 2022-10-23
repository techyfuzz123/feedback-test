import { createContext, useState } from "react";
import instance from "../utils/axios-instance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const login1 = async (regNo, dob, password) => {
    setLoading(true);

    const body = {
      regNo: regNo,
      dob: dob,
      password: password,
    };

    let data;
    await instance
      .post(`/auth/login`, body)
      .then((res) => {
        data = res.data;
        if (res.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => {
        let error = err.response.data.message;
        console.log(error);
      });
    setLoading(false);
  };

  const login = async (regNo, dob, password) => {
    setLoading(true);

    const body = {
      regNo: regNo,
      dob: dob,
      password: password,
    };

    let url =
      process.env.NEXT_PUBLIC_BASE_URL || "http://192.168.0.109:5000/api";
    const r = await fetch(url + "/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(
      function (response) {
        response.status; //=> number 100–599
        response.statusText; //=> String
        response.headers; //=> Headers
        response.url; //=> String

        return response.text();
      },
      function (error) {
        error.message; //=> String
      }
    );
    console.log(JSON.parse(r));
    sessionStorage.setItem("user", r);
    setLoading(false);
  };

  const userLogin = async (userName, password) => {
    setLoading(true);

    const body = {
      userName: userName,
      password: password,
    };

    let data;
    await instance
      .post(`/auth/user/login`, body)
      .then((res) => {
        data = res.data;
        if (res.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => {
        let error = err.response.data.message;
        console.log(error);
      });
    setLoading(false);
  };

  const userLogout = async (userName, password) => {
    setLoading(true);

    const body = {
      userName: userName,
      password: password,
    };

    let data;
    await instance
      .post(`/auth/user/login`, body)
      .then((res) => {
        data = res.data;
        if (res.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(data));
        }
      })
      .catch((err) => {
        let error = err.response.data.message;
        console.log(error);
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
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
