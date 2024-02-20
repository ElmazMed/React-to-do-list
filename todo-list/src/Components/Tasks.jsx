import DoneIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { TasksContext } from "./TasksContext";
import { useContext, useState } from "react";
export default function Tasks() {
  const { tasksData, setTasksData } = useContext(TasksContext);
  const [editedTask, setEditedTask] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const tasksList = tasksData.map((task) => {
    function handleSubmitBtn() {
      const updateTask = tasksData.map((t) => {
        if (t.id === task.id) {
          return { ...t, title: editedTask };
        } else {
          return t;
        }
      });
      setTasksData(updateTask);
      handleClose();
    }
    return (
      <div
        key={task.id}
        className="task-container"
        style={{
          backgroundColor: task.isDone
            ? "#00eb003b"
            : "rgba(245, 245, 220, 0.378)",
        }}
      >
        <Dialog open={open} onClose={handleClose}>
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
        <p>{task.title}</p>
        <div className="cta-btns">
          <IconButton
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              const checkIsDone = tasksData.map((t) => {
                if (t.id === task.id) {
                  t.isDone = !t.isDone;
                }
                return t;
              });
              setTasksData(checkIsDone);
            }}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              const deleteTask = tasksData.filter((t) => {
                if (t.id === task.id) {
                  return t.id !== task.id;
                }
                return t;
              });

              setTasksData(deleteTask);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  });
  return <>{tasksList}</>;
}
