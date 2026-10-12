import type {
    Note,
    NoteStatus,
    StatusFilter
} from "../types/Note";

export interface BoardState {
    notes: Note[];
    searchTerm: string;
    statusFilter: StatusFilter;
    editingNoteId: number | null;
}

export type BoardAction =
    | { type: "ADD_NOTE"; payload: Note }
    | { type: "UPDATE_NOTE"; payload: Note }
    | { type: "DELETE_NOTE"; payload: number }
    | { type: "CHANGE_STATUS"; payload: { id: number; status: NoteStatus } }
    | { type: "TOGGLE_IMPORTANT"; payload: number }
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_FILTER"; payload: StatusFilter }
    | { type: "START_EDIT"; payload: number }
    | { type: "CANCEL_EDIT" };

export function notesReducer(
    state: BoardState,
    action: BoardAction
): BoardState {
    switch (action.type) {
        case "ADD_NOTE":
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };

        case "UPDATE_NOTE":
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
                editingNoteId: null
            };

        case "DELETE_NOTE":
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload),
                editingNoteId:
                    state.editingNoteId === action.payload
                        ? null
                        : state.editingNoteId
            };

        case "CHANGE_STATUS":
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id
                        ? { ...note, status: action.payload.status }
                        : note
                )
            };

        case "TOGGLE_IMPORTANT":
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload
                        ? { ...note, important: !note.important }
                        : note
                )
            };

        case "SET_SEARCH":
            return {
                ...state,
                searchTerm: action.payload
            };

        case "SET_FILTER":
            return {
                ...state,
                statusFilter: action.payload
            };

        case "START_EDIT":
            return {
                ...state,
                editingNoteId: action.payload
            };

        case "CANCEL_EDIT":
            return {
                ...state,
                editingNoteId: null
            };

        default:
            return state;
    }
}
