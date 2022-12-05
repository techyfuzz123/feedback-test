import "@styles/globals.css";
import Layout from "@components/Layout";
import { AuthContextProvider } from "@context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Layout>
  );
}

export default MyApp;
