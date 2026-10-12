import {
    useMemo,
    useReducer,
    useState
} from "react";

import BoardHeader from "./components/BoardHeader";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import NoteDialog from "./components/NoteDialog";
import NotesControls from "./components/NotesControls";
import NotesList from "./components/NotesList";

import { initialNotes } from "./data/initialNotes";

import {
    notesReducer,
    type BoardState
} from "./reducer/notesReducer";

import type {
    NoteFormValues,
    NoteStatus,
    StatusFilter
} from "./types/Note";

import "./App.css";

const initialState: BoardState = {
    notes: initialNotes,
    searchTerm: "",
    statusFilter: "All",
    editingNoteId: null
};

function App() {
    const [state, dispatch] = useReducer(
        notesReducer,
        initialState
    );

    const [
        isNoteDialogOpen,
        setIsNoteDialogOpen
    ] = useState(false);

    const [
        noteToDeleteId,
        setNoteToDeleteId
    ] = useState<number | null>(null);

    const editingNote =
        state.notes.find(
            (note) =>
                note.id === state.editingNoteId
        ) ?? null;

    const noteToDelete =
        state.notes.find(
            (note) =>
                note.id === noteToDeleteId
        ) ?? null;

    const visibleNotes = useMemo(() => {
        const search =
            state.searchTerm
                .trim()
                .toLowerCase();

        return state.notes.filter((note) => {
            const matchesSearch =
                !search ||
                note.title
                    .toLowerCase()
                    .includes(search) ||
                note.description
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                state.statusFilter === "All" ||
                note.status ===
                    state.statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [
        state.notes,
        state.searchTerm,
        state.statusFilter
    ]);

    const importantNotes =
        state.notes.filter(
            (note) => note.important
        ).length;

    const handleAddNote = () => {
        dispatch({
            type: "CANCEL_EDIT"
        });

        setIsNoteDialogOpen(true);
    };

    const handleSubmit = (
        values: NoteFormValues
    ) => {
        if (editingNote) {
            dispatch({
                type: "UPDATE_NOTE",
                payload: {
                    id: editingNote.id,
                    ...values
                }
            });

            setIsNoteDialogOpen(false);
            return;
        }

        dispatch({
            type: "ADD_NOTE",
            payload: {
                id: Date.now(),
                ...values
            }
        });

        setIsNoteDialogOpen(false);
    };

    const handleStatusChange = (
        id: number,
        status: NoteStatus
    ) => {
        dispatch({
            type: "CHANGE_STATUS",
            payload: {
                id,
                status
            }
        });
    };

    const handleFilterChange = (
        value: StatusFilter
    ) => {
        dispatch({
            type: "SET_FILTER",
            payload: value
        });
    };

    const handleSearchChange = (
        value: string
    ) => {
        dispatch({
            type: "SET_SEARCH",
            payload: value
        });
    };

    const handleEdit = (
        id: number
    ) => {
        dispatch({
            type: "START_EDIT",
            payload: id
        });

        setIsNoteDialogOpen(true);
    };

    const handleDelete = (
        id: number
    ) => {
        setNoteToDeleteId(id);
    };

    const handleConfirmDelete = () => {
        if (noteToDeleteId === null) {
            return;
        }

        dispatch({
            type: "DELETE_NOTE",
            payload: noteToDeleteId
        });

        setNoteToDeleteId(null);
    };

    const handleCancelDelete = () => {
        setNoteToDeleteId(null);
    };

    const handleToggleImportant = (
        id: number
    ) => {
        dispatch({
            type: "TOGGLE_IMPORTANT",
            payload: id
        });
    };

    const handleCloseDialog = () => {
        dispatch({
            type: "CANCEL_EDIT"
        });

        setIsNoteDialogOpen(false);
    };

    return (
        <main className="app-shell">
            <BoardHeader
                totalNotes={
                    state.notes.length
                }
                importantNotes={
                    importantNotes
                }
            />

            <div className="board-content">
                <div className="board-actions">
                    <button
                        type="button"
                        className="add-note-button"
                        onClick={
                            handleAddNote
                        }
                    >
                        + Add Note
                    </button>
                </div>

                <NotesControls
                    searchTerm={
                        state.searchTerm
                    }
                    statusFilter={
                        state.statusFilter
                    }
                    onSearchChange={
                        handleSearchChange
                    }
                    onFilterChange={
                        handleFilterChange
                    }
                />

                <div className="results-row">
                    <h2>Shared notes</h2>

                    <span>
                        {
                            visibleNotes.length
                        }{" "}
                        result
                        {
                            visibleNotes.length ===
                            1
                                ? ""
                                : "s"
                        }
                    </span>
                </div>

                <NotesList
                    notes={visibleNotes}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onStatusChange={
                        handleStatusChange
                    }
                    onToggleImportant={
                        handleToggleImportant
                    }
                />
            </div>

            {isNoteDialogOpen && (
                <NoteDialog
                    editingNote={
                        editingNote
                    }
                    onSubmit={
                        handleSubmit
                    }
                    onClose={
                        handleCloseDialog
                    }
                />
            )}

            {noteToDelete && (
                <DeleteConfirmDialog
                    noteTitle={
                        noteToDelete.title
                    }
                    onConfirm={
                        handleConfirmDelete
                    }
                    onCancel={
                        handleCancelDelete
                    }
                />
            )}
        </main>
    );
}

export default App;