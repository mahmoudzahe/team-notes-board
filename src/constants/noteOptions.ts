import type { NoteStatus, StatusFilter } from "../types/Note";

export const noteStatuses: NoteStatus[] = [
    "Todo",
    "In Progress",
    "Done"
];

export const statusFilters: StatusFilter[] = [
    "All",
    ...noteStatuses
];
