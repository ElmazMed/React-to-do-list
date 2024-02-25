import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import "../App.css";
export default function SnackBar({ openSnack, snackMsg }) {
  const align = {
    vertical: "top",
    horizontal: "center",
  };
  const { vertical, horizontal } = align;
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnack}
        message={snackMsg}
        key={vertical + horizontal}
      />
    </Box>
  );
}
