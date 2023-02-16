import { Box, Grid, Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Heading2 } from "../../components";
import { ActiveCollection } from "./active";
import { useRawData } from "../../hooks/useRawData";
import { formatRawData } from "../../utils";

export const VoteAggregation = () => {
  const { loading, data, fetchRawData } = useRawData();
  const formattedData = formatRawData(data);
  console.log("loading ", data, formattedData);
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item sm={12} md={12}>
        <Stack spacing={2} direction="row">
          <LoadingButton
            variant="contained"
            color="info"
            onClick={fetchRawData}
            loading={loading}
          >
            Import
          </LoadingButton>
          <Button variant="contained" color="warning">
            Export
          </Button>
        </Stack>
      </Grid>
      <Grid item sm={12} md={6}>
        <ActiveCollection />
      </Grid>
      <Grid item sm={12} md={6}>
        <Box
          sx={{
            height: 300,
            backgroundColor: "primary.dark",
          }}
        >
          <Heading2 title="Statistics" />
        </Box>
      </Grid>
    </Grid>
  );
};
