
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { noteStatuses } from "../constants/noteOptions";
import type {
  Note,
  NoteFormValues,
  NoteStatus,
} from "../types/Note";

interface NoteFormProps {
  editingNote: Note | null;
  onSubmit: (values: NoteFormValues) => void;
  onCancelEdit: () => void;
}

const emptyForm: NoteFormValues = {
  title: "",
  description: "",
  status: "Todo",
  important: false,
};

function NoteForm({
  editingNote,
  onSubmit,
  onCancelEdit,
}: NoteFormProps) {
  const [formValues, setFormValues] = useState<NoteFormValues>(emptyForm);

  useEffect(() => {
    if (editingNote) {
      setFormValues({
        title: editingNote.title,
        description: editingNote.description,
        status: editingNote.status,
        important: editingNote.important,
      });
      return;
    }

    setFormValues(emptyForm);
  }, [editingNote]);

  const updateField = <K extends keyof NoteFormValues>(
    field: K,
    value: NoteFormValues[K]
  ) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = formValues.title.trim();
    const description = formValues.description.trim();

    if (!title || !description) {
      return;
    }

    onSubmit({
      ...formValues,
      title,
      description,
    });

    if (!editingNote) {
      setFormValues(emptyForm);
    }
  };

  const handleCancel = () => {
    setFormValues(emptyForm);
    onCancelEdit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Title"
            placeholder="Note title"
            fullWidth
            value={formValues.title}
            onChange={(event) =>
              updateField("title", event.target.value)
            }
          />

          <TextField
            label="Description"
            placeholder="Write a short description"
            multiline
            rows={4}
            fullWidth
            value={formValues.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
          />

          <TextField
            select
            label="Status"
            fullWidth
            value={formValues.status}
            onChange={(event) =>
              updateField("status", event.target.value as NoteStatus)
            }
          >
            {noteStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          <FormControlLabel
            label="Important note"
            control={
              <Checkbox
                checked={formValues.important}
                onChange={(event) =>
                  updateField("important", event.target.checked)
                }
              />
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        {editingNote && (
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        )}

        <Button type="submit" variant="contained">
          {editingNote ? "Save changes" : "Add note"}
        </Button>
      </DialogActions>
    </Box>
  );
}

export default NoteForm;
