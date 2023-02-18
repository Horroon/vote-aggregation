import { Box, CardContent, Typography } from "@mui/material";
import { HeadingContainer } from "../../components";
import { calculatePercentile, sumPercentile } from "../../utils/utils";

const Collection = ({ percentile, name, count }) => (
  <Typography>
    {name} {count} : {percentile}
  </Typography>
);

const Vote = ({ person, totalVotes }) => (
  <CardContent
    style={{
      background: "rgb(14 58 113)",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    }}
  >
    <Collection
      name={person?.collection}
      count={person?.total}
      percentile={`${sumPercentile(person, totalVotes)} %`}
    />

    {person?.candidates.map((candidate) => (
      <CardContent
        style={{ background: "#0000004d", marginTop: 2 }}
        key={candidate.candidate + "vote"}
      >
        <Collection
          name={candidate?.candidate}
          count={candidate?.count}
          percentile={`${calculatePercentile(totalVotes, candidate.count)} %`}
        />
      </CardContent>
    ))}
  </CardContent>
);

export const ActiveCollection = ({ collections = [], totalVotes = 0 }) => (
  <HeadingContainer title="Active Collection">
    <Box margin="auto" width="70%">
      {collections.map((vote) => (
        <Vote
          key={vote.collection + vote.count}
          person={vote}
          totalVotes={totalVotes}
        />
      ))}
    </Box>
  </HeadingContainer>
);
