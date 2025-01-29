import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        headerHeight="64px"
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header onMenuClick={toggleSidebar} />
        <main
          className={`flex-1 p-6 bg-gray-50 overflow-auto transition-all duration-1 ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          {children}
        </main>
        <footer
          className={`bg-gray-900 text-gray-400 transition-all duration-1 ${
            isSidebarOpen ? "lg:ml-64" : ""
          }`}
        >
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
