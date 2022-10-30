import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    // bg-slate-900
    <div className="h-screen  mx-auto">
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
