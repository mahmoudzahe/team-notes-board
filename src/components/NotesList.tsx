
import { Box } from "@mui/material";

import type { Note, NoteStatus } from "../types/Note";
import EmptyState from "./EmptyState";
import NoteCard from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: NoteStatus) => void;
  onToggleImportant: (id: number) => void;
}

function NotesList({
  notes,
  onEdit,
  onDelete,
  onStatusChange,
  onToggleImportant,
}: NotesListProps) {
  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </Box>
  );
}

export default NotesList;
