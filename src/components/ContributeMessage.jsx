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
    <section className="min-h-[calc(100vh-88px)] flex flex-col items-center justify-center bg-[#fffefb] py-8 px-6 font-radio">
      <div className="text-center mb-16 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 mb-6">
          Contribute to QSM-CI
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-2">
          Join our open-source community and help advance quantitative
          susceptibility mapping research
        </p>
        <p className="text-sm text-stone-500">
          Choose how you'd like to contribute to the project
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
        {contributeItems.map(({ icon, text, link }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all transform hover:scale-105 duration-300 group cursor-pointer"
          >
            <div className="h-24 w-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 group-hover:from-indigo-100 group-hover:to-indigo-200 transition-all duration-300 text-indigo-500 group-hover:text-indigo-600 shadow-sm group-hover:shadow-md mb-6">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-4">
              {index === 0 ? "QSM-CI Pipeline" : "Web Interface"}
            </h3>
            <p className="text-base text-stone-600 leading-relaxed mb-6 max-w-md">
              {text}
            </p>
            <div className="flex items-center text-sm text-indigo-500 group-hover:text-indigo-600 font-medium">
              <span>Visit GitHub Repository</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ContributeMessage;
