import { useState } from "react";
import { fetchRawData as getRawData } from "../utils";

export const useRawData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRawData = async () => {
    try {
      setLoading(true);
      const resp = await getRawData();
      setData(resp);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchRawData };
};
