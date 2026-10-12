export type NoteStatus = "Todo" | "In Progress" | "Done";

export type StatusFilter = "All" | NoteStatus;

export interface Note {
    id: number;
    title: string;
    description: string;
    status: NoteStatus;
    important: boolean;
}

export interface NoteFormValues {
    title: string;
    description: string;
    status: NoteStatus;
    important: boolean;
}
