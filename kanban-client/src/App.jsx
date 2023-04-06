import { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import "./App.scss";
import { useActions } from "./hooks/useActions";

function App() {
  const { fetchBoards, fetchTasksOfBoard } = useActions();

  useEffect(() => {
    fetchBoards();
    // fetchTasksOfBoard();
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <Header />
      <Board />
    </div>
  );
}

export default App;
