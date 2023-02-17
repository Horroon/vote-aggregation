import { useState } from "react";
import { rawDataURLS } from "../constants/constants";
import { useVoteAggregateState } from "../context/voteAggreationContext";
import { fetchRawData as getRawData } from "../utils/utils";

export const useRawData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchFileUrl } = useVoteAggregateState();

  const fetchRawData = async () => {
    try {
      setLoading(true);
      setError("");
      const resp = await getRawData(searchFileUrl || rawDataURLS.rawData1);
      setData(resp);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchRawData, searchFileUrl };
};
