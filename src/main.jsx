import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import "./api/parseConfig.js";

console.log("Parse App ID:", import.meta.env.VITE_PARSE_APP_ID);
console.log("Parse JS KEY:", import.meta.env.VITE_PARSE_JS_KEY);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
