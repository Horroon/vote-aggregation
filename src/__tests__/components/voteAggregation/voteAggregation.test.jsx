import React from "react";
import { render } from "@testing-library/react";
import { VoteAggregation } from "../../../pages/vote-aggregation/voteAggregation";
import { ActiveCollection } from "../../../pages/vote-aggregation/active";
import { InActive } from "../../../pages/vote-aggregation/inactive";
import { Statistic } from "../../../pages/vote-aggregation/statistic";
import {
  findTotalVote,
  formatRawData,
  sortByDecendingOrder,
} from "../../../utils/utils";
import { sampleRawData } from "../../mockData";
import "@testing-library/jest-dom";

describe("Vote Aggregation UI test", () => {
  const formattedData = sortByDecendingOrder(formatRawData(sampleRawData));
  const totalVotes = findTotalVote(formattedData);

  it("checks vote aggregation components are valid react components", () => {
    expect(React.isValidElement(<VoteAggregation />)).toBe(true);
    expect(React.isValidElement(<ActiveCollection />)).toBe(true);
    expect(React.isValidElement(<InActive />)).toBe(true);
    expect(React.isValidElement(<Statistic />)).toBe(true);
  });

  it("renders active collections", () => {
    const { getByText } = render(
      <ActiveCollection collections={formattedData} totalVotes={totalVotes} />
    );
    const ActiveCollectionHeading = getByText(/Active Collection/i);
    const member = getByText("Michaela Jenkins 14 : 60 %");

    expect(ActiveCollectionHeading).toBeInTheDocument();
    expect(member).toBeInTheDocument();
  });

  it("renders inactive collections", () => {
    const { getByText } = render(<InActive />);
    const InactiveCollectionHeading = getByText(/Inactive/);
    expect(InactiveCollectionHeading).toBeInTheDocument();
  });

  it("renders statistic screen", () => {
    const { getByText } = render(
      <Statistic totalVotes={totalVotes} statisticdata={formattedData} />
    );
    const StatisticHeading = getByText(/Statistics/);
    expect(StatisticHeading).toBeInTheDocument();
    expect(getByText("Total Votes(Active): 23")).toBeInTheDocument();
  });
});
