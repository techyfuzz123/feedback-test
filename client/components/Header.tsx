import type { NextPage } from "next";
import Head from "next/head";

const Header: NextPage = () => {
  return (
    <div className="flex h- flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Header;
