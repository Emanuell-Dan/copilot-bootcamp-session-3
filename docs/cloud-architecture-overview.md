# Cloud Architecture Overview

This document provides a simple system context diagram for the monorepo application.

```mermaid
flowchart LR
    U[User] --> B[Web Browser]
    B --> FE[React Frontend\npackages/frontend]
    FE -->|HTTPS JSON API calls| API[Express API\npackages/backend]
    API -->|Read/Write task data| MEM[(In-Memory Store)]
```

## Create TODO Sequence

```mermaid
sequenceDiagram
    actor User
    participant Browser as Web Browser
    participant FE as React Frontend
    participant API as Express API
    participant Store as In-Memory Store

    User->>Browser: Enter TODO details and click "Create"
    Browser->>FE: Submit create action
    FE->>API: POST /tasks { title, description, priority }
    API->>Store: Save new task in memory
    Store-->>API: Return created task
    API-->>FE: 201 Created + task payload
    FE-->>Browser: Update TODO list UI
    Browser-->>User: Show newly created TODO
```

## Notes

- The React frontend is the client-facing application.
- The Express API serves task operations to the frontend.
- The in-memory store is volatile and resets on backend restart.
