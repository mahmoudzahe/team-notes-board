function EmptyState() {
    return (
        <section className="empty-state">
            <div className="empty-icon">⌕</div>
            <h3>No notes found</h3>
            <p>Try changing the search text or status filter.</p>
        </section>
    );
}

export default EmptyState;
