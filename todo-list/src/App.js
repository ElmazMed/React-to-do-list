import "./App.css";
import Container from "./Components/Container";
import { TasksContext } from "./Components/TasksContext";
import { useState } from "react";
function App() {
  const [tasksData, setTasksData] = useState([]);

  return (
    <TasksContext.Provider value={{ tasksData, setTasksData }}>
      <div className="App">
        <Container />
      </div>
    </TasksContext.Provider>
  );
}

export default App;
