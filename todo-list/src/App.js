import "./App.css";
import Container from "./Components/Container";
import { TasksProvider } from "./Components/TasksContext";
import { SnackProvider } from "./Components/SnackContext";
function App() {
  return (
    <TasksProvider>
      <SnackProvider>
        <div className="App">
          <Container />
        </div>
      </SnackProvider>
    </TasksProvider>
  );
}

export default App;
