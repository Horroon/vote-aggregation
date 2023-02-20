import { CardContent } from "@mui/material";
import { useDrag } from "react-dnd";
import { sumPercentile } from "../../utils/utils";
import { Candidate } from "../candidate";
import { Collection } from "../collection";

export const Vote = ({ person, totalVotes, draggableType = "group" }) => {
  const [{ isDragging }, drag] = useDrag({
    type: draggableType,
    collect: (monitor) => !!monitor.isDragging(),
    item: person,
  });
  return (
    <div ref={drag}>
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
          <Candidate
            personCollection={person.collection}
            candidate={candidate}
            key={candidate.candidate + "vote"}
            totalVotes={totalVotes}
          />
        ))}
      </CardContent>
    </div>
  );
};
