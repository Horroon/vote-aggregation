import { CardContent } from "@mui/material";
import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ActionTypes,
  useDispatch,
  useVoteAggregateState,
} from "../../context/voteAggreationContext";
import {
  formatRawData,
  removeDuplicates,
  sortByDecendingOrder,
  sumPercentile,
} from "../../utils/utils";
import { Candidate } from "../candidate";
import { Collection } from "../collection";

export const Vote = ({ person, totalVotes, draggableType = "group" }) => {
  const { activeCollections } = useVoteAggregateState();
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: draggableType,
    collect: (monitor) => !!monitor.isDragging(),
    item: person,
  });

  const [{}, collectionRef] = useDrop({
    accept: "sub-collection",
    collect: (monitor) => !!monitor.isOver(),
    drop: (item) => addCandidateToAnotherGroup(item),
  });

  const addCandidateToAnotherGroup = ({ personCollection, candidate }) => {
    let newActiveCollection = activeCollections;
    const prevPersonIndex = newActiveCollection.findIndex(
      (ac) => ac.collection === personCollection
    );
    const nextPersonIndex = newActiveCollection.findIndex(
      (np) => np.collection === person.collection
    );

    if (
      prevPersonIndex !== -1 &&
      nextPersonIndex !== -1 &&
      prevPersonIndex !== nextPersonIndex
    ) {
      const prevPerson = newActiveCollection[prevPersonIndex];
      prevPerson.candidates = prevPerson.candidates.filter(
        (prvCandidate) => prvCandidate.candidate !== candidate.candidate
      );
      const sortedPreviousCandidates = sortByDecendingOrder(
        prevPerson.candidates,
        "count"
      );
      prevPerson.candidates = sortedPreviousCandidates;
      prevPerson.total = prevPerson.total - candidate.count;

      const nextPerson = newActiveCollection[nextPersonIndex];
      nextPerson.candidates.push(candidate);
      const sortedNextPersonCandidates = sortByDecendingOrder(
        nextPerson.candidates,
        "count"
      );
      nextPerson.candidates = removeDuplicates(sortedNextPersonCandidates);
      nextPerson.total = nextPerson.total + candidate.count;
      newActiveCollection[prevPersonIndex] = prevPerson;
      newActiveCollection[nextPersonIndex] = nextPerson;

      const removableCollection = newActiveCollection.find(
        (rmvc) => rmvc.collection === candidate.candidate
      );

      const formattCandidates = formatRawData(removableCollection.candidates);

      newActiveCollection = newActiveCollection.filter(
        (nac) => nac.collection !== candidate.candidate
      );
      const newSortedActiveCollections = sortByDecendingOrder(
        [...newActiveCollection, ...formattCandidates],
        "total"
      );

      dispatch({
        type: ActionTypes.UpdataMany,
        payload: {
          activeCollections: newSortedActiveCollections,
        },
      });
    }
  };

  return (
    <div ref={collectionRef}>
      <div ref={drag}>
        <CardContent
          style={{
            background: "rgb(14 58 113)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: 5,
            marginTop: 30,
            marginBottom: 30,
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
    </div>
  );
};
