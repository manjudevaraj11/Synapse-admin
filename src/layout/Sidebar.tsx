import { NavLink } from "react-router-dom";
import {
  Home,
  Boxes,
  ShoppingBag,
  Users,
  FileText,
  Folder,
  UserCircle,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white text-gray-700 border-r border-gray-200 p-5 flex flex-col">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6 px-2 text-black tracking-tight">
        <span className="italic">Framework GRC</span>
      </div>

      {/* Dashboard */}
      <NavItem to="/" icon={<Home size={18} />}>
        Dashboard
      </NavItem>

      {/* Users Section */}
      <Section title="Users" />

      <NavItem to="/users" icon={<Boxes size={18} />}>
        Users
      </NavItem>

      <NavItem to="/roles" icon={<ShoppingBag size={18} />} badge={201}>
        Roles
      </NavItem>

      <NavItem to="/permissions" icon={<Users size={18} />}>
        Permissions
      </NavItem>

      {/* Blog Section */}
      <Section title="Blog" />

      <NavItem to="/posts" icon={<FileText size={18} />}>
        Posts
      </NavItem>

      <NavItem to="/categories" icon={<Folder size={18} />}>
        Categories
      </NavItem>

      <NavItem to="/authors" icon={<UserCircle size={18} />}>
        Authors
      </NavItem>
    </aside>
  );
};

export default Sidebar;

/* --------------------------------------
   Nav Item
---------------------------------------*/
const NavItem = ({
  to,
  icon,
  children,
  badge,
}: {
  to: string;
  icon: JSX.Element;
  children: React.ReactNode;
  badge?: number;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded-lg mb-1 cursor-pointer transition-all
        ${
          isActive
            ? "bg-gray-100 text-blue-600 font-medium"
            : "hover:bg-gray-100"
        }`
      }
    >
      <div className="flex items-center gap-3 text-gray-600">
        {icon}
        <span>{children}</span>
      </div>

      {badge && (
        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

/* --------------------------------------
   Section Label
---------------------------------------*/
const Section = ({ title }: { title: string }) => (
  <div className="text-xs text-gray-500 uppercase mt-4 mb-2 px-2 flex items-center gap-1">
    {title}
  </div>
);
