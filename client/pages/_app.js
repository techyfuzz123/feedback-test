import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const onemin = 1 * 1000 * 60; // 1 sec * 60
  const router = useRouter();

  const now = new Date().getTime();

  useEffect(() => {
    const setupTime = sessionStorage.getItem("setupTime");
    const user = sessionStorage.getItem("user");
    if (!user) {
      router.push("/");
    }
    if (setupTime) {
      if (now - setupTime > onemin * 15) {
        sessionStorage.removeItem("setupTime");
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <Layout>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Layout>
  );
}

export default MyApp;
