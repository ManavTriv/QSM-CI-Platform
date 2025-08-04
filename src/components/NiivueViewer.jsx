import { Link, useMatch } from "react-router-dom";
import { Hospital } from "lucide-react";

const NavLink = ({ to, label }) => {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      className={`text-sm font-radio font-semibold transition-all duration-300 ease-in-out ${
        match
          ? "text-indigo-400 underline underline-offset-4"
          : "text-stone-800 hover:text-indigo-400 hover:underline hover:underline-offset-4"
      }`}
      aria-current={match ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  const links = [
    { to: "/", label: "HOME" },
    { to: "/overview", label: "OVERVIEW" },
    { to: "/images", label: "IMAGES" },
    { to: "/compare", label: "COMPARE" },
    { to: "/contribute", label: "CONTRIBUTE" },
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hospital size={24} className="text-indigo-400" />
          <span className="text-md font-radio font-semibold text-indigo-400">
            QSM-CI PLATFORM
          </span>
        </div>
        <nav className="flex items-center gap-x-6">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} label={label} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
