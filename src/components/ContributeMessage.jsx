import React from "react";
import { Code2, Globe } from "lucide-react";

const contributeItems = [
  {
    icon: <Code2 size={44} strokeWidth={1.5} />,
    text: "To contribute to the QSM-CI pipeline, and submit and run algorithms, click here",
    link: "https://github.com/QSMxT/QSM-CI",
  },
  {
    icon: <Globe size={44} strokeWidth={1.5} />,
    text: "To contribute to the QSM-CI web interface, click here",
    link: "https://github.com/ManavTriv/QSM-CI-Platform",
  },
];

const ContributeMessage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-[#fffefb] py-14 px-6 font-radio">
      <h1 className="text-3xl font-semibold text-indigo-400 text-center mb-12">
        Help Contribute to QSM-CI
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-screen-xl">
        {contributeItems.map(({ icon, text, link }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-6 w-80 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 duration-300 group"
          >
            <div className="h-28 w-28 flex items-center justify-center rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300 text-indigo-400 shadow-inner">
              {icon}
            </div>
            <p className="mt-6 text-base text-gray-700 leading-relaxed">
              {text}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContributeMessage;
