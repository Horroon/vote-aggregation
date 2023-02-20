import { useDrop } from "react-dnd";
import { Box } from "@mui/material";
import { HeadingContainer, Vote } from "../../components";
import {
  ActionTypes,
  useDispatch,
  useVoteAggregateState,
} from "../../context/voteAggreationContext";
import { findTotalVote, formatRawData } from "../../utils/utils";

export const InActive = () => {
  const { inActiveCollections, totalVotes, activeCollections } =
    useVoteAggregateState();

  const dispatch = useDispatch();
  const [{ isOver }, drag] = useDrop({
    accept: "group",
    collect: (monitor) => !!monitor.isOver(),
    drop: (person) => dropItem(person),
  });

  const dropItem = (person) => {
    let collections = activeCollections;
    let inActCollections = inActiveCollections;
    const personIndex = collections.findIndex(
      (p) => p.collection === person.collection
    );
    if (personIndex !== -1) {
      collections = collections.filter(
        (c) => c.collection !== person.collection
      );
      inActCollections.push(person);
      const totalVotes = findTotalVote(collections);
      dispatch({
        type: ActionTypes.UpdataMany,
        payload: {
          activeCollections: collections,
          inActiveCollections: inActCollections,
          totalVotes,
        },
      });
    }
  };

  return (
    <div ref={drag}>
      <HeadingContainer
        title="Inactive"
        boxStyle={{ display: "flex", flexDirection: "column" }}
      >
        <Box margin="auto" width="70%">
          {inActiveCollections.map((InActiveCollection, index) => (
            <Vote
              person={InActiveCollection}
              key={index + "inactive-collection"}
              totalVotes={totalVotes || findTotalVote(inActiveCollections)}
              draggableType="reverse-group"
            />
          ))}
        </Box>
      </HeadingContainer>
    </div>
  );
};
