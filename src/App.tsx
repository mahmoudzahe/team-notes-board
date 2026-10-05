import { useMemo, useReducer } from "react";
import BoardHeader from "./components/BoardHeader";
import NoteForm from "./components/NoteForm";
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

    const editingNote =
        state.notes.find(
            (note) => note.id === state.editingNoteId
        ) ?? null;

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
    }, [
        state.notes,
        state.searchTerm,
        state.statusFilter
    ]);

    const importantNotes = state.notes.filter(
        (note) => note.important
    ).length;

    const handleSubmit = (values: NoteFormValues) => {
        if (editingNote) {
            dispatch({
                type: "UPDATE_NOTE",
                payload: {
                    id: editingNote.id,
                    ...values
                }
            });
            return;
        }

        dispatch({
            type: "ADD_NOTE",
            payload: {
                id: Date.now(),
                ...values
            }
        });
    };

    const handleStatusChange = (
        id: number,
        status: NoteStatus
    ) => {
        dispatch({
            type: "CHANGE_STATUS",
            payload: { id, status }
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

    return (
        <main className="app-shell">
            <BoardHeader
                totalNotes={state.notes.length}
                importantNotes={importantNotes}
            />

            <div className="board-layout">
                <NoteForm
                    editingNote={editingNote}
                    onSubmit={handleSubmit}
                    onCancelEdit={() =>
                        dispatch({ type: "CANCEL_EDIT" })
                    }
                />

                <div className="notes-area">
                    <NotesControls
                        searchTerm={state.searchTerm}
                        statusFilter={state.statusFilter}
                        onSearchChange={(value) =>
                            dispatch({
                                type: "SET_SEARCH",
                                payload: value
                            })
                        }
                        onFilterChange={handleFilterChange}
                    />

                    <div className="results-row">
                        <h2>Shared notes</h2>
                        <span>
                            {visibleNotes.length} result
                            {visibleNotes.length === 1 ? "" : "s"}
                        </span>
                    </div>

                    <NotesList
                        notes={visibleNotes}
                        onEdit={(id) =>
                            dispatch({
                                type: "START_EDIT",
                                payload: id
                            })
                        }
                        onDelete={(id) =>
                            dispatch({
                                type: "DELETE_NOTE",
                                payload: id
                            })
                        }
                        onStatusChange={handleStatusChange}
                        onToggleImportant={(id) =>
                            dispatch({
                                type: "TOGGLE_IMPORTANT",
                                payload: id
                            })
                        }
                    />
                </div>
            </div>
        </main>
    );
}

export default App;
