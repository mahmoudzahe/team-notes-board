import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { noteStatuses } from "../constants/noteOptions";
import type {
    Note,
    NoteFormValues,
    NoteStatus
} from "../types/Note";

interface NoteFormProps {
    editingNote: Note | null;
    onSubmit: (values: NoteFormValues) => void;
    onCancelEdit: () => void;
}

const emptyForm: NoteFormValues = {
    title: "",
    description: "",
    status: "Todo",
    important: false
};

function NoteForm({
    editingNote,
    onSubmit,
    onCancelEdit
}: NoteFormProps) {
    const [formValues, setFormValues] =
        useState<NoteFormValues>(emptyForm);

    useEffect(() => {
        if (editingNote) {
            setFormValues({
                title: editingNote.title,
                description: editingNote.description,
                status: editingNote.status,
                important: editingNote.important
            });
            return;
        }

        setFormValues(emptyForm);
    }, [editingNote]);

    const updateField = <K extends keyof NoteFormValues>(
        field: K,
        value: NoteFormValues[K]
    ) => {
        setFormValues((current) => ({
            ...current,
            [field]: value
        }));
    };

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const title = formValues.title.trim();
        const description = formValues.description.trim();

        if (!title || !description) {
            return;
        }

        onSubmit({
            ...formValues,
            title,
            description
        });

        if (!editingNote) {
            setFormValues(emptyForm);
        }
    };

    const handleCancel = () => {
        setFormValues(emptyForm);
        onCancelEdit();
    };

    return (
        <section className="note-form-card">
            <div className="section-heading">
                <span className="eyebrow">
                    {editingNote ? "Edit note" : "New note"}
                </span>
                <h2>
                    {editingNote
                        ? "Update team note"
                        : "Add a team note"}
                </h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        value={formValues.title}
                        onChange={(event) =>
                            updateField("title", event.target.value)
                        }
                        placeholder="Note title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows={4}
                        value={formValues.description}
                        onChange={(event) =>
                            updateField(
                                "description",
                                event.target.value
                            )
                        }
                        placeholder="Write a short description"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="note-status">Status</label>
                        <select
                            id="note-status"
                            value={formValues.status}
                            onChange={(event) =>
                                updateField(
                                    "status",
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

                    <label className="important-check">
                        <input
                            type="checkbox"
                            checked={formValues.important}
                            onChange={(event) =>
                                updateField(
                                    "important",
                                    event.target.checked
                                )
                            }
                        />
                        <span>Important note</span>
                    </label>
                </div>

                <div className="form-actions">
                    <button className="primary-button" type="submit">
                        {editingNote ? "Save changes" : "Add note"}
                    </button>

                    {editingNote && (
                        <button
                            className="secondary-button"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}

export default NoteForm;
