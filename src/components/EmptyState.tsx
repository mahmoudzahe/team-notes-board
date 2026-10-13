
import { Box, Paper, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function EmptyState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 8,
        px: 3,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          mx: "auto",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          bgcolor: "primary.light",
          color: "primary.main",
        }}
      >
        <SearchOffIcon fontSize="large" />
      </Box>

      <Typography variant="h6">
        No notes found
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Try changing the search text or status filter.
      </Typography>
    </Paper>
  );
}

export default EmptyState;
