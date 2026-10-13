
import { Box, Stack, Paper, Typography } from "@mui/material";

interface BoardHeaderProps {
  totalNotes: number;
  importantNotes: number;
}

function BoardHeader({ totalNotes, importantNotes }: BoardHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        mb: 4,
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{ color: "#4f46e5", fontWeight: 700 }}
        >
          Internal team workspace
        </Typography>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#111827",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Team Notes Board
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Keep shared notes organized and easy to follow.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minWidth: 120,
            flex: { xs: 1, md: "none" },
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
           {totalNotes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total notes
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minWidth: 120,
            flex: { xs: 1, md: "none" },
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
           {importantNotes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Important
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}

export default BoardHeader;
