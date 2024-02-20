import { Button, Stack } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { TasksContext } from "./TasksContext";
export default function CompletedTasks() {
  const tasksData = useContext(TasksContext);

  return (
    <>
      {/* I will create just variables */}
      <Stack spacing={2}>
        <Button variant="outlined" color="success">
          Completed
        </Button>
      </Stack>
    </>
  );
}
