
import { Box, Paper, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function EmptyState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 8,
        px: 3,
        borderRadius: 3,
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
          backgroundColor: "#eef2ff",
          color: "#4f46e5",
        }}
      >
        <SearchOffIcon fontSize="large" />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
       No notes found
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Try changing the search text or status filter.
      </Typography>
    </Paper>
  );
}

export default EmptyState;
