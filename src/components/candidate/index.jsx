import { useDrag } from "react-dnd";
import { CardContent } from "@mui/material";
import { calculatePercentile } from "../../utils/utils";
import { Collection } from "../collection";

export const Candidate = ({ personCollection, candidate, totalVotes }) => {
  const [{}, drag] = useDrag({
    type: "collection",
    item: { personCollection, candidate },
    collect: (monitor) => !!monitor.isDragging(),
  });

  const [{}, dragCollection] = useDrag({
    type: "sub-collection",
    item: { personCollection, candidate },
    collect: (monitor) => !!monitor.isDragging(),
  });
  return (
    <div ref={drag}>
      <CardContent style={{ background: "#0000004d", marginTop: 2 }}>
        <div ref={dragCollection}>
          <Collection
            name={candidate?.candidate}
            count={candidate?.count}
            percentile={`${calculatePercentile(totalVotes, candidate.count)} %`}
          />
        </div>
      </CardContent>
    </div>
  );
};
