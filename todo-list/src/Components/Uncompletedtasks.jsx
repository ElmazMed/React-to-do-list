import { Button, Stack } from "@mui/material";
import React from "react";

export default function Uncompletedtasks() {
  return (
    <>
      {/* I will create just variables */}
      <Stack spacing={2} direction="row">
        <Button variant="outlined" color="error">
          Uncompleted
        </Button>
      </Stack>
    </>
  );
}
