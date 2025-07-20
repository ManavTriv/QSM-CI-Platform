import React from "react";
import { Code2, Globe } from "lucide-react";

const ContributeMessage = () => {
  const contributeItems = [
    {
      icon: <Code2 size={48} strokeWidth={1.5} />,
      text: "To contribute to the QSM-CI pipeline, and submit and run algorithms, click here",
      link: "https://github.com/QSMxT/QSM-CI",
    },
    {
      icon: <Globe size={48} strokeWidth={1.5} />,
      text: "To contribute to the QSM-CI web interface, click here",
      link: "https://github.com/ManavTriv/QSM-CI-Platform",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fffefb] py-12 space-y-16 font-radio">
      <h1 className="text-2xl font-semibold text-indigo-400 text-center">
        Help Contribute to QSM-CI
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-6 max-w-screen-xl">
        {contributeItems.map((item, index) => (
          <a
            href={item.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-6 w-72 rounded-xl bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-200 cursor-pointer group"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors text-indigo-500 shadow">
              {item.icon}
            </div>
            <p className="mt-6 text-[0.9375rem] text-gray-800 leading-relaxed">
              {item.text}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContributeMessage;
