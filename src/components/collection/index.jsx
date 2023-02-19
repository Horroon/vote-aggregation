import { Typography } from "@mui/material";

export const Collection = ({ percentile, name, count }) => (
  <Typography>
    {name} {count} : {percentile}
  </Typography>
);
