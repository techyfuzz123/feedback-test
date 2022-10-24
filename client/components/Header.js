import Head from "next/head";

const Header = () => {
  //flex h- flex-col items-center justify-center py-2
  return (
    <div className="">
      <Head>
        <title>Feedback</title>
        <link rel="icon" href="/favicon.ico" />
        <meta width="device-width" height="device-height"/>
      </Head>
    </div>
  );
};

export default Header;
