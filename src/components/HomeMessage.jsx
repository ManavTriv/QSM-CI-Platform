import { BarChart, Image, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    icon: <BarChart size={44} strokeWidth={1.5} />,
    title: "Overview",
    link: "/overview",
    description: "View algorithm metrics and rankings",
  },
  {
    icon: <Image size={44} strokeWidth={1.5} />,
    title: "Images",
    link: "/images",
    description: "Interactive 3D medical image viewer",
  },
  {
    icon: <Scale size={44} strokeWidth={1.5} />,
    title: "Compare",
    link: "/compare",
    description: "Compare algorithms side-by-side",
  },
  {
    icon: <Users size={44} strokeWidth={1.5} />,
    title: "Contribute",
    link: "/contribute",
    description: "Join our open-source community",
  },
];

const HomeMessage = () => {
  return (
    <section className="min-h-[calc(100vh-88px)] flex flex-col items-center justify-center bg-[#fffefb] py-8 px-6 font-radio">
      <div className="text-center mb-16 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 mb-6">
          Welcome to QSM-CI
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-2">
          A comprehensive platform for comparing and evaluating Quantitative
          Susceptibility Mapping algorithms
        </p>
        <p className="text-sm text-stone-500">
          Explore interactive visualizations, metrics analysis, and
          community-driven ELO rankings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-screen-xl w-full">
        {navItems.map(({ icon, title, link, description }) => (
          <Link
            to={link}
            key={title}
            className="flex flex-col items-center text-center p-6 w-full max-w-56 mx-auto bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all transform hover:scale-105 duration-300 group cursor-pointer"
          >
            <div className="h-20 w-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-100 group-hover:to-indigo-200 transition-all duration-300 text-indigo-500 group-hover:text-indigo-600 shadow-sm group-hover:shadow-md mb-4">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-stone-800 mb-1">
              {title}
            </h3>
            <p className="text-sm text-stone-500 group-hover:text-stone-600 transition-colors">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeMessage;
