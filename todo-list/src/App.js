import "./App.css";
import Container from "./Components/Container";
import SnackBar from "./Components/SnackBar";
import { TasksContext } from "./Components/TasksContext";
import { SnackContext } from "./Components/SnackContext";
import { useState } from "react";
function App() {
  const [tasksData, setTasksData] = useState([]);
  const [openScnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const handleShowHide = () => {
    setOpenSnack(true);
    setTimeout(() => {
      setOpenSnack(false);
    }, 2000);
  };
  return (
    <TasksContext.Provider value={{ tasksData, setTasksData }}>
      <SnackContext.Provider value={{ handleShowHide, setSnackMsg }}>
        <div className="App">
          <Container />
          <SnackBar openSnack={openScnack} snackMsg={snackMsg} />
        </div>
      </SnackContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
