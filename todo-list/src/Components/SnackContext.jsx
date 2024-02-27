import { createContext, useContext, useState } from "react";
import SnackBar from "../Components/SnackBar";

const SnackContext = createContext([]);

export const SnackProvider = ({ children }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const handleShowHide = () => {
    setOpenSnack(true);
    setTimeout(() => {
      setOpenSnack(false);
    }, 2000);
  };
  return (
    <SnackContext.Provider value={{ handleShowHide, setSnackMsg }}>
      <SnackBar openSnack={openSnack} snackMsg={snackMsg} />
      {children}
    </SnackContext.Provider>
  );
};
export const useSnack = () => {
  return useContext(SnackContext);
};
