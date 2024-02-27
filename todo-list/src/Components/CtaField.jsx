import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Tasks from "./Tasks";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "./TasksContext";
import { useSnack } from "./SnackContext";
import { useContext, useState, useEffect } from "react";

export default function CtaField() {
  useEffect(() => {
    const getSavedTasks = JSON.parse(localStorage.getItem("task")) ?? [];
    setTasksData(getSavedTasks);
  }, []);
  const { tasksData, setTasksData } = useTasks();
  const { handleShowHide, setSnackMsg } = useSnack();
  const [taskInput, setTaskInput] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  const [task, setTask] = useState();

  function handleOpen(taskId) {
    setTask(taskId.id);
    setOpen(true);
  }
  function handleSubmitBtn() {
    const updateTask = tasksData.map((t) => {
      if (t.id === task) {
        return { ...t, title: editedTask };
      } else {
        return t;
      }
    });
    handleShowHide();
    setSnackMsg("Task is updated successfully!");
    setTasksData(updateTask);
    localStorage.setItem("task", JSON.stringify(updateTask));
    handleClose();
  }
  function handleAddBtn() {
    if (taskInput === " " || taskInput === "  ") {
      alert("Please write a task");
    } else {
      const newAddedTask = {
        id: uuidv4(),
        title: taskInput,
        isDone: false,
      };

      handleShowHide();
      setSnackMsg("Your task is added successfully!");
      const savedTasks = [...tasksData, newAddedTask];
      setTasksData(savedTasks);
      localStorage.setItem("task", JSON.stringify(savedTasks));
      setTaskInput("");
    }
  }

  return (
    <>
      <div style={{ width: "100%", maxHeight: "60vh", overflowY: "scroll" }}>
        <Dialog open={open}>
          <DialogTitle>Edit Your Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Task"
              fullWidth
              variant="standard"
              value={editedTask}
              onChange={(e) => {
                setEditedTask(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitBtn}
              variant="outlined"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Tasks openDialog={handleOpen} />
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Task"
            variant="outlined"
            fullWidth
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
          />
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", margin: ".6rem .4rem" }}
            disabled={taskInput.length === 0 ? true : false}
            onClick={handleAddBtn}
          >
            Add Task
          </Button>
        </Stack>
      </div>
    </>
  );
}
