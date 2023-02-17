import { Box } from "@mui/material";
import { Heading2 } from "../heading2/heading";

export const HeadingContainer = ({ children, boxStyle, title }) => (
  <Box
    sx={{
      minHeight: 300,
      backgroundColor: "primary.dark",
    }}
    {...boxStyle}
    paddingBottom={2}
  >
    <Heading2 title={title} />
    {children}
  </Box>
);
