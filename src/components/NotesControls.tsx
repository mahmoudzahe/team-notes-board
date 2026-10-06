import { statusFilters } from "../constants/noteOptions";
import type { StatusFilter } from "../types/Note";

interface NotesControlsProps {
    searchTerm: string;
    statusFilter: StatusFilter;
    onSearchChange: (value: string) => void;
    onFilterChange: (value: StatusFilter) => void;
}

function NotesControls({
    searchTerm,
    statusFilter,
    onSearchChange,
    onFilterChange
}: NotesControlsProps) {
    return (
        <section className="controls">
            <div className="search-field">
                <label htmlFor="search">Search notes</label>
                <input
                    id="search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by title or description"
                />
            </div>

            <div className="filter-field">
                <label htmlFor="status-filter">Status</label>
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(event) =>
                        onFilterChange(event.target.value as StatusFilter)
                    }
                >
                    {statusFilters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
}

export default NotesControls;
