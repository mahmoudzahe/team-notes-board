import {
    noteStatuses
} from "../constants/noteOptions";

import type {
    Note,
    NoteStatus
} from "../types/Note";

interface NoteCardProps {
    note: Note;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onStatusChange: (
        id: number,
        status: NoteStatus
    ) => void;
    onToggleImportant: (
        id: number
    ) => void;
}

function EditIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M12 20h9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function DeleteIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M3 6h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M8 6V4h8v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                d="M19 6l-1 14H6L5 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M10 11v5M14 11v5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function NoteCard({
    note,
    onEdit,
    onDelete,
    onStatusChange,
    onToggleImportant
}: NoteCardProps) {
    const statusClass =
        note.status
            .toLowerCase()
            .replace(" ", "-");

    return (
        <article
            className={`note-card ${
                note.important
                    ? "important"
                    : ""
            }`}
        >
            <div className="note-card-top">
                <span
                    className={`status-badge ${statusClass}`}
                >
                    {note.status}
                </span>

                <button
                    type="button"
                    className="important-button"
                    onClick={() =>
                        onToggleImportant(
                            note.id
                        )
                    }
                    aria-label={
                        note.important
                            ? "Remove important"
                            : "Mark as important"
                    }
                    title={
                        note.important
                            ? "Remove important"
                            : "Mark as important"
                    }
                >
                    {note.important
                        ? "★"
                        : "☆"}
                </button>
            </div>

            <h3>{note.title}</h3>

            <p className="note-description">
                {note.description}
            </p>

            <div className="status-control">
                <label
                    htmlFor={`status-${note.id}`}
                >
                    Change status
                </label>

                <select
                    id={`status-${note.id}`}
                    value={note.status}
                    onChange={(event) =>
                        onStatusChange(
                            note.id,
                            event.target
                                .value as NoteStatus
                        )
                    }
                >
                    {noteStatuses.map(
                        (status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="note-card-actions">
                <button
                    type="button"
                    className="icon-action-button edit-icon-button"
                    onClick={() =>
                        onEdit(note.id)
                    }
                    aria-label="Edit note"
                    data-tooltip="Edit note"
                >
                    <EditIcon />
                </button>

                <button
                    type="button"
                    className="icon-action-button delete-icon-button"
                    onClick={() =>
                        onDelete(note.id)
                    }
                    aria-label="Delete note"
                    data-tooltip="Delete note"
                >
                    <DeleteIcon />
                </button>
            </div>
        </article>
    );
}

export default NoteCard;