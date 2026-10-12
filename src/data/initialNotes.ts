import type { Note } from "../types/Note";

export const initialNotes: Note[] = [
    {
        id: 1,
        title: "Prepare sprint planning",
        description: "Collect unfinished items and prepare the next sprint priorities.",
        status: "Todo",
        important: true
    },
    {
        id: 2,
        title: "Review pull requests",
        description: "Check the open frontend pull requests before the team meeting.",
        status: "In Progress",
        important: false
    },
    {
        id: 3,
        title: "Update onboarding notes",
        description: "Add the latest setup steps for new team members.",
        status: "Done",
        important: false
    }
];
