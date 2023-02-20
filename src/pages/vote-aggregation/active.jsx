import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { HeadingContainer, Vote } from "../../components";
import {
  ActionTypes,
  useDispatch,
  useVoteAggregateState,
} from "../../context/voteAggreationContext";
import { findTotalVote, sortByDecendingOrder } from "../../utils/utils";

export const ActiveCollection = () => {
  const [{}, reverseGroupRef] = useDrop({
    accept: "reverse-group",
    collect: (monitor) => !!monitor.isOver(),
    drop: (person) => reAddGroupToActiveCollection(person),
  });

  const [{}, candidateRef] = useDrop({
    accept: "collection",
    collect: (monitor) => !!monitor.isOver(),
    drop: (item) => addNewActiveGroup(item),
  });

  const { activeCollections, inActiveCollections, totalVotes } =
    useVoteAggregateState();
  const dispatch = useDispatch();

  const addNewActiveGroup = (item) => {
    const { personCollection, candidate } = item;
    const personIndex = activeCollections.findIndex(
      (ac) => ac.collection === personCollection
    );
    if (personIndex !== -1 && personCollection !== candidate.candidate) {
      const person = activeCollections[personIndex];
      person.candidates = person.candidates.filter(
        (pc) => pc.candidate !== candidate.candidate
      );
      person.total = person.total - candidate.count;
      activeCollections[personIndex] = person
      const newGroup = {
        collection: candidate.candidate,
        total: candidate.count,
        count: candidate.count,
        candidates: [candidate],
      };
      activeCollections.push(newGroup);
      dispatch({
        type: ActionTypes.UpdataMany,
        payload: {
          activeCollections: sortByDecendingOrder(activeCollections, "total"),
        },
      });
    }
  };

  const reAddGroupToActiveCollection = (person) => {
    const newInActiveCollections = inActiveCollections.filter(
      (p) => p.collection !== person.collection
    );
    activeCollections.push(person);
    const totalVotes = findTotalVote(activeCollections);
    dispatch({
      type: ActionTypes.UpdataMany,
      payload: {
        totalVotes,
        activeCollections: sortByDecendingOrder(activeCollections, "total"),
        inActiveCollections: newInActiveCollections,
      },
    });
  };

  return (
    <div ref={candidateRef}>
      <HeadingContainer title="Active Collection">
        <Box margin="auto" width="70%" ref={reverseGroupRef}>
          {activeCollections.map((vote) => (
            <Vote
              key={vote.collection + vote.count}
              person={vote}
              totalVotes={totalVotes}
            />
          ))}
        </Box>
      </HeadingContainer>
    </div>
  );
};
