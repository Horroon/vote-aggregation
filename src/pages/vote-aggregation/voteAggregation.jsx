import { Grid, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import { ActiveCollection } from "./active";
import { InActive } from "./inactive";
import { Statistic } from "./statistic";
import { useRawData } from "../../hooks/useRawData";
import { formatExportData } from "../../utils/utils";
import { Export as ExportButton } from "../../components";
import { useVoteAggregateState } from "../../context/voteAggreationContext";

const Error = styled("div")(({ theme }) => ({
  fontSize: 14,
  color: "red",
  fontWeight: "bold",
}));

export const VoteAggregation = () => {
  const { loading, fetchRawData, error, searchFileUrl } = useRawData();
  const { activeCollections, totalVotes } = useVoteAggregateState();
  const exportData = formatExportData(activeCollections);
  return (
    <Grid container spacing={2} padding={2}>
      {error && <Error>Something went wrong</Error>}
      <Grid item sm={12} md={12}>
        <Stack spacing={2} direction="row">
          <LoadingButton
            variant="contained"
            color="info"
            onClick={fetchRawData}
            loading={loading}
          >
            {searchFileUrl
              ? "Import your file data"
              : "Import default file data"}
          </LoadingButton>
          <ExportButton
            title="Export"
            filename="result.json"
            data={exportData}
            disabled={!activeCollections.length}
          />
        </Stack>
      </Grid>
      <Grid item sm={12} md={6}>
        <ActiveCollection />
      </Grid>
      <Grid item sm={12} md={6}>
        <Statistic statisticdata={activeCollections} totalVotes={totalVotes} />
      </Grid>
      <Grid item sm={12} md={6}>
        <InActive />
      </Grid>
    </Grid>
  );
};
