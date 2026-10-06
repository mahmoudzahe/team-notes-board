import type { MouseEvent } from "react";
import NoteForm from "./NoteForm";
import type {
    Note,
    NoteFormValues
} from "../types/Note";

interface NoteDialogProps {
    editingNote: Note | null;
    onSubmit: (
        values: NoteFormValues
    ) => void;
    onClose: () => void;
}

function NoteDialog({
    editingNote,
    onSubmit,
    onClose
}: NoteDialogProps) {
    const handleBackdropClick = () => {
        onClose();
    };

    const handleDialogClick = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
    };

    return (
        <div
            className="dialog-backdrop"
            onClick={handleBackdropClick}
        >
            <div
                className="note-dialog"
                role="dialog"
                aria-modal="true"
                aria-label={
                    editingNote
                        ? "Edit note"
                        : "Add note"
                }
                onClick={handleDialogClick}
            >
                <button
                    type="button"
                    className="dialog-close-button"
                    onClick={onClose}
                    aria-label="Close dialog"
                >
                    ×
                </button>

                <NoteForm
                    editingNote={editingNote}
                    onSubmit={onSubmit}
                    onCancelEdit={onClose}
                />
            </div>
        </div>
    );
}

export default NoteDialog;