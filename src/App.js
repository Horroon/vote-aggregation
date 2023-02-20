import React, { useReducer } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { VoteAggregationLayout } from "./components";
import { VoteAggregation } from "./pages";
import {
  VoteAggregateContext,
  VoteAggregateContextInitialState,
  voteAggregateReducer,
} from "./context/voteAggreationContext";

export function RunApp() {
  const [voteAggreation, dispatch] = useReducer(
    voteAggregateReducer,
    VoteAggregateContextInitialState
  );
  return (
    <VoteAggregateContext.Provider value={{ state: voteAggreation, dispatch }}>
      <VoteAggregationLayout>
        <DndProvider backend={HTML5Backend}>
          <VoteAggregation />
        </DndProvider>
      </VoteAggregationLayout>
    </VoteAggregateContext.Provider>
  );
}

export default RunApp;
