import "@styles/globals.css";
import Layout from "@components/Layout";
import { AuthContextProvider } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@components/Loading";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const onemin = 1 * 1000 * 60; // 1 sec * 60
  const router = useRouter();

  const now = new Date().getTime();

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  return (
    <Layout>
      <AuthContextProvider>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </AuthContextProvider>
    </Layout>
  );
}

export default MyApp;
