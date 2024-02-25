import DoneIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TasksContext } from "./TasksContext";
import { SnackContext } from "./SnackContext";
import { useContext, useState, useMemo } from "react";
export default function Tasks({ openDialog }) {
  const { tasksData, setTasksData } = useContext(TasksContext);
  const { handleShowHide, setSnackMsg } = useContext(SnackContext);
  const [filtredTasks, setFiltredTasks] = useState("all");

  let tasksCompletion = tasksData;
  const unCompletedTasks = useMemo(() => {
    return tasksData.filter((t) => !t.isDone);
  }, [tasksData]);

  const completedTasks = useMemo(() => {
    return tasksData.filter((t) => t.isDone);
  }, [tasksData]);

  if (filtredTasks === "completed") {
    tasksCompletion = completedTasks;
  } else if (filtredTasks === "uncompleted") {
    tasksCompletion = unCompletedTasks;
  }

  const tasksList = tasksCompletion.map((task) => {
    function handleOpenDialog() {
      openDialog(task);
    }
    return (
      <div
        key={task.id}
        className="task-container"
        style={{
          backgroundColor: task.isDone
            ? "#00eb003b"
            : "rgba(245, 245, 220, 0.378)",
          textDecoration: task.isDone ? "line-through" : "none",
        }}
      >
        <p>{task.title}</p>
        <div className="cta-btns">
          <IconButton color="primary" onClick={handleOpenDialog}>
            <CreateIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              const checkIsDone = tasksData.map((t) => {
                if (t.id === task.id) {
                  t.isDone = !t.isDone;
                  if (t.isDone) {
                    handleShowHide();
                    setSnackMsg("Your task is completed!");
                  }
                }
                return t;
              });
              setTasksData(checkIsDone);
              localStorage.setItem("task", JSON.stringify(checkIsDone));
            }}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              const confirmToDelete = window.confirm(
                "I confirm to delete the task"
              );
              if (confirmToDelete) {
                handleShowHide();
                setSnackMsg("Your task is removed!");
                const deleteTask = tasksData.filter((t) => {
                  if (t.id === task.id) {
                    return t.id !== task.id;
                  }
                  return t;
                });
                setTasksData(deleteTask);
                localStorage.setItem("task", JSON.stringify(deleteTask));
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  });

  return (
    <>
      <div
        style={{ margin: "1rem", display: "flex", justifyContent: "center" }}
      >
        <ToggleButtonGroup
          value={filtredTasks}
          exclusive
          onChange={(e) => {
            setFiltredTasks(e.target.value);
          }}
        >
          <ToggleButton value="all">ALL</ToggleButton>
          <ToggleButton value="completed">COMPLETED</ToggleButton>
          <ToggleButton value="uncompleted">UNCOMPLETED</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {tasksList}
    </>
  );
}
