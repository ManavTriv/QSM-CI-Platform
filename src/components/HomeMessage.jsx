import React from "react";
import { BarChart, Image, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";

const OverviewMessage = () => {
  const navItems = [
    {
      icon: <BarChart size={40} />,
      title: "Overview",
      description: "Navigate to the Overview section",
      link: "/overview",
    },
    {
      icon: <Image size={40} />,
      title: "Images",
      description: "Navigate to the Images section",
      link: "/images",
    },
    {
      icon: <Scale size={40} />,
      title: "Compare",
      description: "Navigate to the Compare section",
      link: "/compare",
    },
    {
      icon: <Users size={40} />,
      title: "Contribute",
      description: "Navigate to the Contribute section",
      link: "/contribute",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fffefb] py-12 space-y-16">
      <h1 className="text-2xl font-semibold text-indigo-400 font-radio text-center">
        Welcome to the QSM-CI Platform
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 px-6">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-5 w-44"
          >
            <Link
              to={item.link}
              className="h-24 w-24 flex items-center justify-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors text-indigo-400 shadow-md"
              aria-label={`Go to ${item.title}`}
            >
              {item.icon}
            </Link>
            <p className="text-[0.9375rem] font-radio text-gray-800 leading-relaxed">
              Navigate to the{" "}
              <Link
                to={item.link}
                className="font-medium text-indigo-600 hover:underline"
              >
                {item.title}
              </Link>{" "}
              section
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewMessage;
