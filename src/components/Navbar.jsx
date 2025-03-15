import { Link, useMatch } from "react-router-dom";

const linkStyles =
  "text-lg font-semi-bold underline decoration-red-400 underline-offset-5 cursor-pointer hover:text-red-400 transition-all duration-300";

const NavLink = ({ to, label }) => {
  const match = useMatch(to);

  return (
    <Link to={to}>
      <p
        className={`${linkStyles} ${match ? "text-red-400" : "text-stone-800"}`}
      >
        {label}
      </p>
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="w-full p-5 pb-7 shadow-md flex flex-row justify-between items-center">
      <h1 className={`${linkStyles}`}>QSM-CI Web Interface</h1>
      <nav className="flex space-x-6">
        <NavLink to="/" label="Home" />
        <NavLink to="/images" label="Images" />
        <NavLink to="/compare" label="Comapare" />
      </nav>
    </div>
  );
};

export default Navbar;
