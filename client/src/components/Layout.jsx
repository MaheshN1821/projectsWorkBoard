import React from "react";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <div className="font-sans bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
