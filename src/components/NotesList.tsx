import type { Note, NoteStatus } from "../types/Note";
import EmptyState from "./EmptyState";
import NoteCard from "./NoteCard";

interface NotesListProps {
    notes: Note[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: NoteStatus) => void;
    onToggleImportant: (id: number) => void;
}

function NotesList({
    notes,
    onEdit,
    onDelete,
    onStatusChange,
    onToggleImportant
}: NotesListProps) {
    if (notes.length === 0) {
        return <EmptyState />;
    }

    return (
        <section className="notes-grid">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    onToggleImportant={onToggleImportant}
                />
            ))}
        </section>
    );
}

export default NotesList;
