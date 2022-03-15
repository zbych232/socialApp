import React from "react";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const MyButton = ({ children, onClick, btnClassName, tipClassName, tip }) => {
  return (
    <Tooltip title={tip} className={tipClassName} placement="top">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default MyButton;
