import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        {/* Top Navbar will go here later */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
