import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
export const CustomToolbarSelect = ({ selectedRows, setFontsToUpload }) => {
  const useStyles = makeStyles({
    iconButton: {
      marginRight: "24px",
      top: "50%",
      display: "inline-block",
      position: "relative",
      transform: "translateY(-50%)",
    },
    CloudUploadIcon: {
      color: "#000",
    },
  });

  const classes = useStyles;

  const handleClick = () =>
    setFontsToUpload(selectedRows.data.map((d) => d.index));

  return (
    <div className={"custom-toolbar-select"}>
      <Tooltip title={"icon 1"}>
        <IconButton className={classes.iconButton} onClick={handleClick}>
          <CloudUploadIcon className={classes.CloudUploadIcon} />
        </IconButton>
      </Tooltip>
    </div>
  );
};
