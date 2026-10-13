
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

import { statusFilters } from "../constants/noteOptions";
import type { StatusFilter } from "../types/Note";

interface NotesControlsProps {
  searchTerm: string;
  statusFilter: StatusFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: StatusFilter) => void;
}

function NotesControls({
  searchTerm,
  statusFilter,
  onSearchChange,
  onFilterChange,
}: NotesControlsProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TextField
        label="Search notes"
        placeholder="Search by title or description"
        type="search"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel id="status-filter-label">
          Status
        </InputLabel>

        <Select
          labelId="status-filter-label"
          id="status-filter"
          label="Status"
          value={statusFilter}
          onChange={(event) =>
            onFilterChange(event.target.value as StatusFilter)
          }
        >
          {statusFilters.map((filter) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

export default NotesControls;
