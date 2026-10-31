import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LanguageProvider from "./LanguageProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<LanguageProvider><App /></LanguageProvider>);
