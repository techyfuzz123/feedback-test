import { createContext, useContext, useEffect, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const fetchUser = () => {
  const userData = useSessionStorage("user");
  const user = JSON.parse(userData);
  return user;
};

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const now = new Date().getTime();

  // useEffect(() => {
  //   setErrorMsg(errorMsg);
  // }, [errorMsg]);

  const fetchUser = () => {
    setLoading(true);
    const userData = useSessionStorage("user");
    const user = JSON.parse(userData);
    setLoading(false);
    return user;
  };

  const loggedIn = async () => {
    setLoading(true);

    let response = { eMessage: "no value received" };

    response = await fetch(url + "/auth/loggedIn", {
      method: "GET",
      credentials: "include",
    })
      .then(async function (res) {
        const status = res.status;
        const value = {
          status,
          data: await res.json(),
        };
        return value;
      })
      .then(function ({ data, status }) {
        if (status != 200) {
          setErrorMsg(data.message);
          return data;
        }
        return data;
      });
    console.log(response);

    setLoading(false);
  };

  const login = async (regNo, dob, password) => {
    setLoading(true);

    const body = {
      regNo: regNo,
      dob: dob,
      password: password,
    };

    let response = { eMessage: "no value received" };

    response = await fetch(url + "/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async function (res) {
        const status = res.status;
        const value = {
          status,
          data: await res.json(),
        };
        return value;
      })
      .then(function ({ data, status }) {
        if (status != 200) {
          setErrorMsg(data.eMessage);
          return data;
        }
        return data;
      });
    if (!response["eMessage"]) {
      sessionStorage.setItem("user", JSON.stringify(response));
      sessionStorage.setItem("setupTime", now);
    }

    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);

    await fetch(url + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async function (res) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("setupTime");
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  const userLogin = async (userName, password) => {
    setLoading(true);

    const body = {
      userName: userName,
      password: password,
    };

    let response = { eMessage: "no value received" };

    response = await fetch(url + "/auth/user/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async function (res) {
        const status = res.status;
        const value = {
          status,
          data: await res.json(),
        };
        return value;
      })
      .then(function ({ data, status }) {
        if (status != 200) {
          setErrorMsg(data.eMessage);
          return data;
        }
        return data;
      });
    if (!response["eMessage"]) {
      sessionStorage.setItem("user", JSON.stringify(response));
      sessionStorage.setItem("setupTime", now);
    }

    setLoading(false);
  };

  const userLogout = async () => {
    setLoading(true);

    await fetch(url + "/auth/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async function (res) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("setupTime");
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const value = {
    errorMsg,
    login,
    loggedIn,
    fetchUser,
    logout,
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading && (
        <div
          role="status"
          className="flex  flex-col items-center justify-center min-h-screen"
        >
          <div className=""></div>
          <span className="">Loading...</span>
        </div>
      )}
      {!loading && children}
    </AuthContext.Provider>
  );
};
