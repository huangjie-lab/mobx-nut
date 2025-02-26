import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import CountPage from "./pages/CountPage.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // <App />
  <CountPage />
  // </StrictMode>
);
