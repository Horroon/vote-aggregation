import { Box, CardContent, Typography } from "@mui/material";
import { Heading2 } from "../../components";

const Collection = ({ percentile, name, count }) => (
  <Typography>
    {name} {count} : {percentile}
  </Typography>
);

const Vote = ({ person }) => (
  <CardContent
    style={{
      background: "rgb(14 58 113)",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      borderRadius: 5,
    }}
  >
    <Collection
      name={person?.name}
      count={person?.count}
      percentile={person.percentile}
    />

    <CardContent style={{ background: "#0000004d", marginTop: 2 }}>
      <Collection
        name={person?.name}
        count={person?.count}
        percentile={person.percentile}
      />
    </CardContent>
    {person?.relevantpersons.map((relativeperson) => (
      <CardContent style={{ background: "#0000004d", marginTop: 2 }}>
        <Collection
          name={relativeperson?.name}
          count={relativeperson?.count3}
          percentile={relativeperson?.percentile}
        />
      </CardContent>
    ))}
  </CardContent>
);

export const ActiveCollection = () => (
  <Box
    sx={{
      height: 300,
      backgroundColor: "primary.dark",
    }}
  >
    <Heading2 title="Active Collection" />
    <Box container margin="auto" width="70%" marginTop={4} marginBottom={4}>
      {[
        {
          name: "Micle Jackin",
          count: 3,
          percentile: "40%",
          relevantpersons: [
            {
              name: "Micle Jackson",
              count: 10,
              percentile: "50%",
            },
          ],
        },
      ].map((vote) => (
        <Vote person={vote} />
      ))}
    </Box>
  </Box>
);
