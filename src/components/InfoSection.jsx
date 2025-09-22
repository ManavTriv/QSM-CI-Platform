import React from "react";

const InfoSection = ({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  title,
  children,
  variant = "primary",
  className = "",
}) => {
  const bgColor = variant === "primary" ? "bg-indigo-50" : "bg-gray-50";

  return (
    <div className={`${bgColor} rounded-lg p-3 ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 text-indigo-600 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-stone-800 mb-1 text-base">
            {title}
          </h3>
          <div className="text-sm text-stone-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
