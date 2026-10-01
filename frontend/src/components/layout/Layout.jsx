import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <div className="shell">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="page">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
