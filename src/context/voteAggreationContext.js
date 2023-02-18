import { createContext, useContext } from "react";

export const ActionTypes = {
  UpdateFileUrl: "UpdateFileUrl",
  UpdateTotalVotes: "UpdateTotalVotes",
};

export const VoteAggregateContextInitialState = {
  searchFileUrl: "",
  totalVotes: 0,
};

export const voteAggregateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UpdateFileUrl:
      return { ...state, searchFileUrl: action.payload };
    case ActionTypes.UpdateTotalVotes:
      return { ...state, totalVotes: action.payload };
    default:
      return state;
  }
};

export const VoteAggregateContext = createContext({
  state: VoteAggregateContextInitialState,
  dispatch: () => null,
});

export const useVoteAggregateState = () =>
  useContext(VoteAggregateContext).state;
export const useDispatch = () => useContext(VoteAggregateContext).dispatch;
