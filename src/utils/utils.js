export const levenshteinDistance = (str1 = "", str2 = "") => {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
};

export const fetchRawData = (url) => fetch(url).then((resp) => resp.json());

export const formatRawData = (rawData) => {
  const formattedData = [];
  const candidatesdone = [];

  rawData.forEach((rd) => {
    rawData.forEach((rrd) => {
      if (
        levenshteinDistance(rd.candidate, rrd.candidate) <= 5 &&
        !candidatesdone.includes(rrd.candidate)
      ) {
        const personIndex = formattedData.findIndex(
          (fd) => fd.collection === rd.candidate
        );
        if (personIndex !== -1) {
          const person = formattedData[personIndex];
          person.total = person.total + rrd.count;
          person.candidates.push(rrd);
          candidatesdone.push(rrd.candidate);
        } else if (!candidatesdone.includes(rd.candidate)) {
          const newGroup = {
            collection: rd.candidate,
            total: rd.count,
            count: rd.count,
            candidates: [rd],
          };
          formattedData.push(newGroup);
          candidatesdone.push(rd.candidate);
        }
      }
    });
  });
  return formattedData;
};

export const calculatePercentile = (total, count) =>
  Math.round((count * 100) / total);

export const sumPercentile = (person, totalVotes) => {
  let percentileSum = 0;
  person.candidates.forEach((candidate) => {
    percentileSum =
      percentileSum + calculatePercentile(totalVotes, candidate.count);
  });
  return percentileSum;
};

export const findTotalVote = (data) => {
  let sum = 0;
  data.forEach((candidate) => {
    sum = sum + candidate.total;
  });
  return sum;
};

export function downloadJsonFile(filename, data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const formatExportData = (formattedData) =>
  formattedData.map((fd) => {
    delete fd.count;
    return fd;
  });

export const sortByDecendingOrder = (formattedData = [], sortBy) =>
  formattedData.sort((obj1, obj2) => (obj1[sortBy] < obj2[sortBy] ? 1 : -1));

export const removeDuplicates = (data = [], property = "candidate") =>
  data.filter(
    (d, index, self) =>
      index === self.findIndex((s) => s[property] === d[property])
  );
