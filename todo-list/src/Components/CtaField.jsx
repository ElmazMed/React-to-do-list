import { Box, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Tasks from "./Tasks";
import { v4 as uuidv4 } from "uuid";
import { TasksContext } from "./TasksContext";
import { useContext } from "react";

export default function CtaField() {
  const { tasksData, setTasksData } = useContext(TasksContext);
  const [taskInput, setTaskInput] = useState("");

  function handleAddBtn() {
    if (taskInput === " " || taskInput === "") {
      alert("Please write a task");
    } else {
      const newAddedTask = {
        id: uuidv4(),
        title: taskInput,
        isDone: false,
        isRemoved: false,
      };
      setTasksData([...tasksData, newAddedTask]);
      setTaskInput("");
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Tasks />
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
          style={{ width: "100%", margin: ".6rem 0" }}
          onClick={handleAddBtn}
        >
          Add Task
        </Button>
      </Stack>
    </div>
  );
}
