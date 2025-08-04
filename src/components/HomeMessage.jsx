import React from "react";
import { BarChart, Image, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    icon: <BarChart size={44} strokeWidth={1.5} />,
    title: "Overview",
    link: "/overview",
  },
  {
    icon: <Image size={44} strokeWidth={1.5} />,
    title: "Images",
    link: "/images",
  },
  {
    icon: <Scale size={44} strokeWidth={1.5} />,
    title: "Compare",
    link: "/compare",
  },
  {
    icon: <Users size={44} strokeWidth={1.5} />,
    title: "Contribute",
    link: "/contribute",
  },
];

const OverviewMessage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-[#fffefb] py-14 px-6 font-radio">
      <h1 className="text-3xl font-semibold text-indigo-400 text-center mb-12">
        Welcome to the QSM-CI Platform
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-xl">
        {navItems.map(({ icon, title, link }, idx) => (
          <Link
            to={link}
            key={idx}
            className="flex flex-col items-center text-center p-5 w-48 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 duration-300 group"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300 text-indigo-400 shadow-inner">
              {icon}
            </div>
            <p className="mt-4 text-sm text-gray-500">Navigate to</p>
            <p className="text-base font-bold uppercase text-indigo-400 tracking-wide">
              {title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OverviewMessage;
