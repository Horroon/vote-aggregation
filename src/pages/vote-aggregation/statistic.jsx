import { Box, CardContent, Typography } from "@mui/material";
import { HeadingContainer } from "../../components";
import { findTotalVote, sumPercentile } from "../../utils/utils";

export const Statistic = ({ statisticdata = [] }) => (
  <HeadingContainer
    title="Statistics"
    boxStyle={{ display: "flex", flexDirection: "column" }}
  >
    {statisticdata.length ? (
      <Box container margin="auto" width="50%" textAlign="center" color="#fff">
        <Typography>
          Total Votes(Active): {findTotalVote(statisticdata)}
        </Typography>
        <CardContent
          style={{ background: "#0000004d", marginTop: 2, borderRadius: 5 }}
        >
          {statisticdata.map((sdata, i) => (
            <Typography key={sdata.collection + i}>
              {sdata.collection} {sdata.total}: {sumPercentile(sdata)}%
            </Typography>
          ))}
        </CardContent>
      </Box>
    ) : (
      ""
    )}
  </HeadingContainer>
);
