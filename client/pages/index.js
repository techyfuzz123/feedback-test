import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1>submit feedback</h1>
      </div>
    </>
  );
};

export default Home;
