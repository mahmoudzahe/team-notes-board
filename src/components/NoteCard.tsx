
import {
  Card,
  CardContent,
  CardActions,
  Stack,
  Chip,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { noteStatuses } from "../constants/noteOptions";
import type { Note, NoteStatus } from "../types/Note";

interface NoteCardProps {
  note: Note;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: NoteStatus) => void;
  onToggleImportant: (id: number) => void;
}

function NoteCard({
  note,
  onEdit,
  onDelete,
  onStatusChange,
  onToggleImportant,
}: NoteCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderColor: note.important ? "warning.main" : "divider",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Chip
            label={note.status}
            size="small"
            color={
              note.status === "Done"
                ? "success"
                : note.status === "In Progress"
                  ? "warning"
                  : "default"
            }
          />

          <Tooltip
            title={
              note.important
                ? "Remove important"
                : "Mark as important"
            }
          >
            <IconButton
              aria-label={
                note.important
                  ? "Remove important"
                  : "Mark as important"
              }
              color={note.important ? "warning" : "default"}
              onClick={() => onToggleImportant(note.id)}
            >
              {note.important ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          {note.title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            mb: 3,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {note.description}
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          label="Change status"
          value={note.status}
          onChange={(event) =>
            onStatusChange(note.id, event.target.value as NoteStatus)
          }
        >
          {noteStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "flex-end",
          px: 2,
          pb: 2,
        }}
      >
        <Tooltip title="Edit note">
          <IconButton
            aria-label="Edit note"
            color="primary"
            onClick={() => onEdit(note.id)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete note">
          <IconButton
            aria-label="Delete note"
            color="error"
            onClick={() => onDelete(note.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default NoteCard;
