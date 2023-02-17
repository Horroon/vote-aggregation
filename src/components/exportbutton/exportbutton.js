import React from "react";
import { Button } from "@mui/material";
import { downloadJsonFile } from "../../utils/utils";

const DownloadJSONFile = ({ data, filename, disabled, title }) => (
  <Button
    variant="contained"
    color="warning"
    onClick={() => downloadJsonFile(filename, data)}
    disabled={disabled}
  >
    {title}
  </Button>
);

export default DownloadJSONFile;
