import { useState } from "react";
import { rawDataURLS } from "../constants/constants";
import {
  ActionTypes,
  useDispatch,
  useVoteAggregateState,
} from "../context/voteAggreationContext";
import {
  fetchRawData as getRawData,
  sortByDecendingOrder,
  formatRawData,
  findTotalVote,
} from "../utils/utils";

export const useRawData = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchFileUrl } = useVoteAggregateState();
  const dispatch = useDispatch();

  const fetchRawData = async () => {
    try {
      setLoading(true);
      setError("");
      const resp = await getRawData(searchFileUrl || rawDataURLS.rawData1);
      const activeCollections = sortByDecendingOrder(
        formatRawData(resp),
        "total"
      );
      const totalVotes = findTotalVote(activeCollections);
      dispatch({
        type: ActionTypes.UpdataMany,
        payload: { activeCollections, totalVotes, inActiveCollections: [] },
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchRawData, searchFileUrl };
};
