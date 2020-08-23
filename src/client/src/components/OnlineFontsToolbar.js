import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { makeStyles } from "@material-ui/core/styles";
export const OnlineFontsToolbar = ({ selectedRows, setFontsToDownload }) => {
  const useStyles = makeStyles({
    iconButton: {
      marginRight: "24px",
      top: "50%",
      display: "inline-block",
      position: "relative",
      transform: "translateY(-50%)",
    },
    CloudDownloadIcon: {
      color: "#000",
    },
  });

  const classes = useStyles;

  const handleClick = () =>
    setFontsToDownload(selectedRows.data.map((d) => d.index));

  return (
    <div className={"custom-toolbar-select"}>
      <Tooltip title={"Télécharger"}>
        <IconButton className={classes.iconButton} onClick={handleClick}>
          <CloudDownloadIcon className={classes.CloudDownloadIcon} />
          <span>Télécharger</span>
        </IconButton>
      </Tooltip>
    </div>
  );
};
