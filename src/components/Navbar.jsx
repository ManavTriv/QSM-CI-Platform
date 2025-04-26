import { Link, useMatch } from "react-router-dom";
import { Hospital } from "lucide-react";

const NavLink = ({ to, label }) => {
  const match = useMatch(to);

  return (
    <Link to={to} className="group relative flex items-center">
      <p
        className={`text-md font-radio font-semibold cursor-pointer transition-colors duration-300 ${
          match
            ? "text-indigo-400"
            : "text-stone-800 group-hover:text-indigo-400"
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="w-full px-5 py-7 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Hospital size={24} className="text-indigo-400" />
        <h1 className="text-md font-radio font-semibold text-indigo-400 cursor-default">
          QSM-CI PLATFORM
        </h1>
      </div>
      <nav className="flex items-center space-x-6">
        <NavLink to="/" label="HOME" />
        <NavLink to="/images" label="IMAGES" />
        <NavLink to="/compare" label="COMPARE" />
      </nav>
    </div>
  );
};

export default Navbar;
