import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.css";
import GuessTable from "./components/GuessTable";
import GameContainer from "./components/GameContainer";
import VirtualKeyboard from "./components/VirtualKeyboard";

const App = () => {
  return (
    <main>
      <GameContainer>
        <GuessTable />
        <VirtualKeyboard />
      </GameContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ width: "400px" }}
      />
    </main>
  );
};

export default App;
