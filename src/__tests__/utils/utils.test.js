import {
  levenshteinDistance,
  formatRawData,
  sortByDecendingOrder,
  calculatePercentile,
  findTotalVote,
  formatExportData,
} from "../../utils/utils";
import { sampleRawData } from "../mockData";

const formattedData = formatRawData(sampleRawData);

describe("utils tests", () => {
  it("levenshteinDistance compares both string distance", () => {
    const str1 = "hitting";
    const str2 = "kitten";
    expect(levenshteinDistance(str1, str2)).toEqual(3);
  });

  it("formats rawdata", () => {
    const peron1 = formattedData[0];
    expect(peron1.collection).toBe("Michaela Jenkins");
    expect(formattedData.length).toEqual(3);
  });

  it("sorts data by decending order", () => {
    const sortedData = sortByDecendingOrder([
      { collection: "test1", total: 2 },
      { collection: "test1", total: 30 },
    ]);
    expect(sortedData[0].total).toBe(30);
  });

  it("calculates percentage", () => {
    const percent = calculatePercentile(10, 5);
    expect(percent).toBe(50);
  });

  it("finds total votes", () => {
    const totalVotes = findTotalVote(formattedData);
    expect(totalVotes).toBe(23);
  });

  it("formats data that is to be exportable", () => {
    const exportableData = formatExportData(formattedData);
    const d1 = exportableData[0];
    expect(!d1?.count).toBe(true);
  });
});
