import { useNavigate } from "react-router-dom";
import { Home, MoveLeft } from "lucide-react";
import { useState } from "react";

const NavigateButton = ({ to, label }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(to)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center cursor-pointer bg-white shadow-md py-2 px-4 rounded-2xl gap-2 overflow-hidden transition-all duration-300 w-fit ${
        hovered ? "pl-3 pr-4" : "pl-2 pr-4"
      }`}
    >
      <div
        className={`flex items-center justify-center transition-all duration-300 ${
          hovered
            ? "w-4 opacity-100 translate-x-0 mr-1"
            : "w-0 opacity-0 -translate-x-2 mr-0"
        } overflow-hidden`}
      >
        <MoveLeft size={15} />
      </div>
      <div className="flex items-center gap-2">
        <Home size={15} className="transition-transform duration-300" />
        <p className="text-xs font-radio">{label}</p>
      </div>
    </div>
  );
};

export default NavigateButton;
