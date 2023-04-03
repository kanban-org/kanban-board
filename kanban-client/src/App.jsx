import { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import "./App.scss";
import { useActions } from "./hooks/useActions";

function App() {
  const { fetchBoards } = useActions();

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <Header />
      <Board />
      {/* {boardData && <Board boardData={boardData} />}
      <Overlay />
			<Modal>{<AddTaskModal />}</Modal> */}
    </div>
  );
}

export default App;
