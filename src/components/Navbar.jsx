import { Link, useMatch } from "react-router-dom";

const NavLink = ({ to, label }) => {
  const match = useMatch(to);

  return (
    <Link to={to} className="group relative">
      <p className={`text-lg font-[600] cursor-pointer ${match ? "text-indigo-600" : "text-stone-800"}`}>
        {label}
        <span className={`absolute left-0 bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ${match ? "w-full" : "w-0 group-hover:w-full"}`}></span>
      </p>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="w-full p-5 pb-7 shadow-md flex flex-row justify-between items-center">
      <h1 className="text-lg font-[600] text-indigo-800 cursor-default">
        QSM-CI Web Interface
      </h1>
      <nav className="flex space-x-6">
        <NavLink to="/" label="Home" />
        <NavLink to="/images" label="Images" />
        <NavLink to="/compare" label="Compare" />
      </nav>
    </div>
  );
};

export default Navbar;