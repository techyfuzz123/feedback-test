import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const { children } = props;
  return (
    // bg-slate-900
    <div className="flex  text-stone-400 flex-col min-h-screen items-center justify-center py-2">
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
