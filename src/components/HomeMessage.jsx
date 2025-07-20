import React from "react";
import { BarChart, Image, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";

const OverviewMessage = () => {
  const navItems = [
    {
      icon: <BarChart size={48} strokeWidth={1.5} />,
      title: "Overview",
      link: "/overview",
    },
    {
      icon: <Image size={48} strokeWidth={1.5} />,
      title: "Images",
      link: "/images",
    },
    {
      icon: <Scale size={48} strokeWidth={1.5} />,
      title: "Compare",
      link: "/compare",
    },
    {
      icon: <Users size={48} strokeWidth={1.5} />,
      title: "Contribute",
      link: "/contribute",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fffefb] py-12 space-y-16 font-radio">
      <h1 className="text-3xl font-semibold text-indigo-400 text-center">
        Welcome to the QSM-CI Platform
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 px-6 max-w-screen-xl">
        {navItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex flex-col items-center text-center p-4 w-48 rounded-xl bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200 cursor-pointer group"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors text-indigo-500 shadow">
              {item.icon}
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-500">Navigate to</p>
              <p className="text-base uppercase font-bold text-indigo-400 tracking-wide">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OverviewMessage;
