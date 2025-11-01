import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Handle redirect from static post HTML
if (window.location.search.startsWith('?redirect=')) {
  const redirectPath = window.location.search.replace('?redirect=', '');
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);
