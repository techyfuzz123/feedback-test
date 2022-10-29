import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    // bg-slate-900
    <div className="container h-screen  mx-auto text-stone-800 ">
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
