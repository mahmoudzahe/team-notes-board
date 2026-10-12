interface DeleteConfirmDialogProps {
    noteTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function DeleteConfirmDialog({
    noteTitle,
    onConfirm,
    onCancel
}: DeleteConfirmDialogProps) {
    return (
        <div
            className="dialog-backdrop"
            onClick={onCancel}
        >
            <div
                className="confirm-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-dialog-title"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="delete-dialog-icon">
                    !
                </div>

                <h2 id="delete-dialog-title">
                    Delete note?
                </h2>

                <p>
                    Are you sure you want to
                    delete{" "}
                    <strong>
                        {noteTitle}
                    </strong>
                    ? This action cannot be
                    undone.
                </p>

                <div className="confirm-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="delete-confirm-button"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmDialog;