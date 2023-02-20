import { Box, CardContent, Typography } from "@mui/material";
import { HeadingContainer } from "../../components";
import { sumPercentile } from "../../utils/utils";

export const Statistic = ({ statisticdata = [], totalVotes }) => (
  <HeadingContainer
    title="Statistics"
    boxStyle={{ display: "flex", flexDirection: "column" }}
  >
    {statisticdata.length ? (
      <Box margin="auto" width="50%" textAlign="center" color="#fff">
        <Typography>Total Votes(Active): {totalVotes}</Typography>
        <CardContent
          style={{ background: "#0000004d", marginTop: 2, borderRadius: 5 }}
        >
          {statisticdata.map((sdata, i) => (
            <Typography key={sdata.collection + i}>
              {sdata.collection} {sdata.total}: {sumPercentile(sdata,totalVotes)}%
            </Typography>
          ))}
        </CardContent>
      </Box>
    ) : (
      ""
    )}
  </HeadingContainer>
);
