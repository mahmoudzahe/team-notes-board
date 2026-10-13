
import {
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import NoteForm from "./NoteForm";
import type { Note, NoteFormValues } from "../types/Note";

interface NoteDialogProps {
  editingNote: Note | null;
  onSubmit: (values: NoteFormValues) => void;
  onClose: () => void;
}

function NoteDialog({
  editingNote,
  onSubmit,
  onClose,
}: NoteDialogProps) {
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {editingNote ? "Update team note" : "Add a team note"}

        <IconButton
          aria-label="Close dialog"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <NoteForm
        editingNote={editingNote}
        onSubmit={onSubmit}
        onCancelEdit={onClose}
      />
    </Dialog>
  );
}

export default NoteDialog;
