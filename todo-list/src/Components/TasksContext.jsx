import { createContext, useState, useContext } from "react";

const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
  const [tasksData, setTasksData] = useState([]);
  return (
    <TasksContext.Provider value={{ tasksData, setTasksData }}>
      {children}
    </TasksContext.Provider>
  );
};
export const useTasks = () => {
  return useContext(TasksContext);
};
