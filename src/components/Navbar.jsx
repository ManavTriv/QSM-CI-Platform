import { Link, useMatch } from "react-router-dom";
import { Hospital, Menu, X } from "lucide-react";
import { useState } from "react";

const NavLink = ({ to, label, mobile = false, onClick }) => {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${
        mobile
          ? "block px-4 py-3 text-base font-radio font-medium rounded-lg transition-all duration-200"
          : "text-base font-radio font-semibold transition-all duration-300 ease-in-out"
      } ${
        match
          ? mobile
            ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-400"
            : "text-indigo-400 underline underline-offset-4 decoration-2"
          : mobile
          ? "text-stone-700 hover:bg-indigo-50 hover:text-indigo-600"
          : "text-stone-700 hover:text-indigo-500 hover:underline hover:underline-offset-4 hover:decoration-2"
      }`}
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "HOME" },
    { to: "/overview", label: "OVERVIEW" },
    { to: "/images", label: "IMAGES" },
    { to: "/compare", label: "COMPARE" },
    { to: "/graphs", label: "GRAPHS" },
    { to: "/contribute", label: "CONTRIBUTE" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-100 group-hover:to-indigo-200 transition-all duration-300">
              <Hospital
                size={20}
                className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-300"
              />
            </div>
            <span className="text-lg font-radio font-bold text-stone-800 group-hover:text-indigo-600 transition-colors duration-300">
              QSM-CI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} label={label} />
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  label={label}
                  mobile={true}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
