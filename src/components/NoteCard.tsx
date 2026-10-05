import { noteStatuses } from "../constants/noteOptions";
import type { Note, NoteStatus } from "../types/Note";

interface NoteCardProps {
    note: Note;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: NoteStatus) => void;
    onToggleImportant: (id: number) => void;
}

function NoteCard({
    note,
    onEdit,
    onDelete,
    onStatusChange,
    onToggleImportant
}: NoteCardProps) {
    const statusClass = note.status
        .toLowerCase()
        .replaceAll(" ", "-");

    return (
        <article
            className={`note-card ${
                note.important ? "important" : ""
            }`}
        >
            <div className="note-card-top">
                <span className={`status-badge ${statusClass}`}>
                    {note.status}
                </span>

                <button
                    className={`important-button ${
                        note.important ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => onToggleImportant(note.id)}
                    aria-label={
                        note.important
                            ? "Unmark as important"
                            : "Mark as important"
                    }
                >
                    {note.important ? "★" : "☆"}
                </button>
            </div>

            <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
            </div>

            <div className="note-status-control">
                <label htmlFor={`status-${note.id}`}>
                    Change status
                </label>
                <select
                    id={`status-${note.id}`}
                    value={note.status}
                    onChange={(event) =>
                        onStatusChange(
                            note.id,
                            event.target.value as NoteStatus
                        )
                    }
                >
                    {noteStatuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="note-actions">
                <button
                    className="text-button"
                    type="button"
                    onClick={() => onEdit(note.id)}
                >
                    Edit
                </button>

                <button
                    className="text-button danger"
                    type="button"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </article>
    );
}

export default NoteCard;
