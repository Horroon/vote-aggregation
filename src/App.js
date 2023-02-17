import React, { useReducer } from "react";
import { VoteAggregationLayout } from "./components";
import { VoteAggregation } from "./pages";
import {
  VoteAggregateContext,
  VoteAggregateContextInitialState,
  voteAggregateReducer,
} from "./context/voteAggreationContext";

function RunApp() {
  const [voteAggreation, dispatch] = useReducer(
    voteAggregateReducer,
    VoteAggregateContextInitialState
  );
  return (
    <VoteAggregateContext.Provider value={{ state: voteAggreation, dispatch }}>
      <VoteAggregationLayout>
        <VoteAggregation />
      </VoteAggregationLayout>
    </VoteAggregateContext.Provider>
  );
}

export default RunApp;
