import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const { children } = props;
  return (
    <div className="flex  bg-slate-900 text-stone-400 flex-col min-h-screen items-center justify-center py-2">
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
