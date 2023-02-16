import { Typography } from "@mui/material";

export const Heading2 = ({ title, style }) => (
  <Typography
    variant="h5"
    fontWeight="bold"
    color="#fff"
    textAlign="center"
    style={{ background: "#00000069", ...style }}
  >
    {title}
  </Typography>
);
