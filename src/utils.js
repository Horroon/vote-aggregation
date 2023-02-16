const levenshteinDistance = (str1 = "", str2 = "") => {
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
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
};

export const fetchRawData = () =>
  fetch(
    "https://fiverr-project-vote-analysis.s3.us-west-2.amazonaws.com/data.json"
  ).then((resp) => resp.json());

export const formatRawData = (rawData) => {
  const formattedData = [];
  const candidatesdone = [];

  rawData.forEach((rd) => {
    rawData.forEach((rrd) => {
      if (
        levenshteinDistance(rd.candidate, rrd.candidate) <= 4 &&
        !candidatesdone.includes(rrd.candidate)
      ) {
        const personIndex = formattedData.findIndex(
          (fd) => fd.candidate === rd.candidate
        );
        if (personIndex !== -1) {
          const person = formattedData[personIndex];
          person.total = person.total + rrd.count;
          rrd.percentile = Math.floor((rrd.count * 100) / person.total);
          person.totalPercentile = person?.totalPercentile + rrd.percentile;
          person.candidates.push(rrd);
          candidatesdone.push(rrd.candidate);
        } else if (!candidatesdone.includes(rd.candidate)) {
          const newPerson = {
            candidate: rd.candidate,
            total: rd.count,
            candidates: [rd],
            totalPercentile: 0,
          };
          formattedData.push(newPerson);
          candidatesdone.push(rd.candidate);
        }
      }
    });
  });
  return formattedData;
};

export const formatDataAccordingToUI = (rawData) => {
  const formattedRawData = formatRawData(rawData);
  const uiData = formattedRawData.map((formattedrawdata) => {});
};
