import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { GameProvider } from "./contexts/GameContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
