import { createContext, useContext } from "react";

export const ActionTypes = {
  UpdateFileUrl: "UpdateFileUrl",
};

export const VoteAggregateContextInitialState = {
  searchFileUrl: "",
};

export const voteAggregateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UpdateFileUrl:
      return { ...state, searchFileUrl: action.payload };
    default:
      return state;
  }
};

export const VoteAggregateContext = createContext({
  state: VoteAggregateContextInitialState,
  dispatch: () => null,
});

export const useVoteAggregateState = () => useContext(VoteAggregateContext).state;
export const useDispatch = () => useContext(VoteAggregateContext).dispatch;
