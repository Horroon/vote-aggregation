import { createContext, useContext } from "react";

export const ActionTypes = {
  UpdateFileUrl: "UpdateFileUrl",
  UpdateTotalVotes: "UpdateTotalVotes",
  AddActiveCollection: "AddActiveCollection",
  AddInActiveCollection: "AddInActiveCollection",
  UpdataMany: "UpdateMany",
};

export const VoteAggregateContextInitialState = {
  searchFileUrl: "",
  totalVotes: 0,
  activeCollections: [],
  inActiveCollections: [],
};

export const voteAggregateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UpdateFileUrl:
      return { ...state, searchFileUrl: action.payload };
    case ActionTypes.UpdateTotalVotes:
      return { ...state, totalVotes: action.payload };
    case ActionTypes.AddActiveCollection:
      return { ...state, activeCollections: action.payload };
    case ActionTypes.AddInActiveCollection:
      return { ...state, inActiveCollections: action.payload };
    case ActionTypes.UpdataMany:
      return { ...state, ...action.payload };
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
