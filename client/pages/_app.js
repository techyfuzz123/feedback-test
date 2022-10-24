import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const onemin = 1*1000*60; // 1 sec * 60

  const now = new Date().getTime();

  useEffect(() => {
    const setupTime = sessionStorage.getItem("setupTime");
    if (setupTime) {
      if (now - setupTime > onemin * 15 ) {
        sessionStorage.removeItem("setupTime");
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContextProvider>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
