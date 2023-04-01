import { useEffect, useContext } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Board from "./components/Board";
import { globalContext } from "./context/globalContext";
import KanbanApi from "./APIs/KanbanApi";
import "./App.scss";
import { useActions } from "./hooks/useActions";

function App() {
  const { fetchBoards, fetchTracks } = useActions();

  const { boardData, setBoardData, currentBoardId } = useContext(globalContext);

  useEffect(() => {
    fetchBoards();
    fetchTracks();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await KanbanApi.get(`/boards/${currentBoardId}/tasks`);
        const data = response.data[0];
        setBoardData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentBoardId, setBoardData]);

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
