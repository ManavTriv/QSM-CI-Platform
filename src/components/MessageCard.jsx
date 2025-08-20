import React from "react";

const MessageCard = ({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-indigo-100 p-4 font-radio ${className}`}
    >
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
          <Icon className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-stone-800">{title}</h1>
          <p className="text-xs text-stone-600">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default MessageCard;
