import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";


export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [studentErrorMsg, setstudentErrorMsg] = useState(null);
  const [facultyErrorMsg, setfacultyErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const now = new Date().getTime();

  useEffect(() => {
    setstudentErrorMsg(studentErrorMsg);
  }, [studentErrorMsg]);

  // * to fetch the detail of student from session storage
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
          setstudentErrorMsg(data.message);
          return data;
        }
        return data;
      });

    setLoading(false);
  };

  // * function that is used to login for students
  const studentLogin = async (regNo, dob, password) => {
    setLoading(true);

    const body = {
      regNo: regNo,
      dob: dob,
      password: password,
    };

    let response = { eMessage: "no value received", path: "student" };

    response = await fetch(url + "/auth/student/login", {
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
          setstudentErrorMsg(data.eMessage);
          return data;
        }
        return data;
      });
    if (!response["eMessage"]) {
      sessionStorage.setItem("user", JSON.stringify(response));
      sessionStorage.setItem("setupTime", now);
    }

    // router.push("/");

    setLoading(false);
  };

  // * function that is used to logout for students
  const studentLogout = async () => {
    setLoading(true);

    await fetch(url + "/auth/student/logout", {
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

  // * function that is used to login for faculty
  const facultyLogin = async (userName, password) => {
    setLoading(true);

    const body = {
      userName: userName,
      password: password,
    };

    let response = { eMessage: "no value received" };

    response = await fetch(url + "/auth/staff/login", {
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
          setfacultyErrorMsg(data.eMessage);
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

  // * function that is used to logout for students
  const facultyLogout = async () => {
    setLoading(true);

    await fetch(url + "/auth/staff/logout", {
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
    studentErrorMsg,
    facultyErrorMsg,
    studentLogin,
    loggedIn,
    fetchUser,
    studentLogout,
    facultyLogin,
    facultyLogout,
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
