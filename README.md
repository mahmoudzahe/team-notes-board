## Main Implementation Decisions

- Used `useReducer` to manage the main board state and keep state changes organized in one place.
- Defined clear actions for adding, editing, deleting, changing status, toggling important notes, searching, and filtering.
- Split the UI into reusable components.
- Kept shared types, constants, and initial data in separate files to avoid duplication and keep the code organized.
- Search and status filtering work together to control which notes are displayed.