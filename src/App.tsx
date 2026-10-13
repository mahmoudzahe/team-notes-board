
import { useMemo, useReducer, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BoardHeader from "./components/BoardHeader";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import NoteDialog from "./components/NoteDialog";
import NotesControls from "./components/NotesControls";
import NotesList from "./components/NotesList";

import { initialNotes } from "./data/initialNotes";
import { notesReducer, type BoardState } from "./reducer/notesReducer";
import type {
  NoteFormValues,
  NoteStatus,
  StatusFilter,
} from "./types/Note";

const initialState: BoardState = {
  notes: initialNotes,
  searchTerm: "",
  statusFilter: "All",
  editingNoteId: null,
};

function App() {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<number | null>(null);

  const editingNote =
    state.notes.find((note) => note.id === state.editingNoteId) ?? null;

  const noteToDelete =
    state.notes.find((note) => note.id === noteToDeleteId) ?? null;

  const visibleNotes = useMemo(() => {
    const search = state.searchTerm.trim().toLowerCase();

    return state.notes.filter((note) => {
      const matchesSearch =
        !search ||
        note.title.toLowerCase().includes(search) ||
        note.description.toLowerCase().includes(search);

      const matchesStatus =
        state.statusFilter === "All" ||
        note.status === state.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [state.notes, state.searchTerm, state.statusFilter]);

  const importantNotes = state.notes.filter(
    (note) => note.important
  ).length;

  const handleAddNote = () => {
    dispatch({ type: "CANCEL_EDIT" });
    setIsNoteDialogOpen(true);
  };

  const handleSubmit = (values: NoteFormValues) => {
    if (editingNote) {
      dispatch({
        type: "UPDATE_NOTE",
        payload: {
          id: editingNote.id,
          ...values,
        },
      });

      setIsNoteDialogOpen(false);
      return;
    }

    dispatch({
      type: "ADD_NOTE",
      payload: {
        id: Date.now(),
        ...values,
      },
    });

    setIsNoteDialogOpen(false);
  };

  const handleStatusChange = (id: number, status: NoteStatus) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: { id, status },
    });
  };

  const handleFilterChange = (value: StatusFilter) => {
    dispatch({
      type: "SET_FILTER",
      payload: value,
    });
  };

  const handleSearchChange = (value: string) => {
    dispatch({
      type: "SET_SEARCH",
      payload: value,
    });
  };

  const handleEdit = (id: number) => {
    dispatch({
      type: "START_EDIT",
      payload: id,
    });

    setIsNoteDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setNoteToDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (noteToDeleteId === null) {
      return;
    }

    dispatch({
      type: "DELETE_NOTE",
      payload: noteToDeleteId,
    });

    setNoteToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setNoteToDeleteId(null);
  };

  const handleToggleImportant = (id: number) => {
    dispatch({
      type: "TOGGLE_IMPORTANT",
      payload: id,
    });
  };

  const handleCloseDialog = () => {
    dispatch({ type: "CANCEL_EDIT" });
    setIsNoteDialogOpen(false);
  };

  return (
    <Box component="main" sx={{ py: { xs: 3, md: 6 } }}>
      <Container maxWidth="lg">
        <BoardHeader
          totalNotes={state.notes.length}
          importantNotes={importantNotes}
        />

        <Stack spacing={3}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNote}
            >
              Add Note
            </Button>
          </Box>

          <NotesControls
            searchTerm={state.searchTerm}
            statusFilter={state.statusFilter}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Shared notes
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {visibleNotes.length}{" "}
                {visibleNotes.length === 1 ? "result" : "results"}
              </Typography>
            </Box>

            <NotesList
              notes={visibleNotes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onToggleImportant={handleToggleImportant}
            />
          </Box>
        </Stack>
      </Container>

      {isNoteDialogOpen && (
        <NoteDialog
          editingNote={editingNote}
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
        />
      )}

      {noteToDelete && (
        <DeleteConfirmDialog
          noteTitle={noteToDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </Box>
  );
}

export default App;
