interface BoardHeaderProps {
    totalNotes: number;
    importantNotes: number;
}

function BoardHeader({
    totalNotes,
    importantNotes
}: BoardHeaderProps) {
    return (
        <header className="board-header">
            <div>
                <span className="eyebrow">Internal team workspace</span>
                <h1>Team Notes Board</h1>
                <p>Keep shared notes organized and easy to follow.</p>
            </div>

            <div className="summary">
                <div className="summary-card">
                    <strong>{totalNotes}</strong>
                    <span>Total notes</span>
                </div>

                <div className="summary-card">
                    <strong>{importantNotes}</strong>
                    <span>Important</span>
                </div>
            </div>
        </header>
    );
}

export default BoardHeader;
