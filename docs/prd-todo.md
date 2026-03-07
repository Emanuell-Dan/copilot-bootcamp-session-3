# Product Requirements Document (PRD) - Todo App Upgrade

## 1. Overview

We are upgrading the current basic TODO app (title + completion status) to improve day-to-day task planning while keeping the experience simple and teachable. The MVP will add due dates, priority levels, and quick date-based filters, all using local storage only with no backend changes. Scope is intentionally lean for the bootcamp: richer visual treatment and advanced sorting are deferred to Post-MVP.

---

## 2. MVP Scope

- Add optional `dueDate` field to tasks using ISO format `YYYY-MM-DD`.
- Add `priority` field with enum values `P1 | P2 | P3`.
- Default `priority` to `P3` when not provided.
- Add filters/tabs: `All`, `Today`, `Overdue`.
- Filter behavior:
  - `All` view includes completed and incomplete tasks.
  - `Today` and `Overdue` views include only incomplete tasks.
- Keep storage local only (no backend or external storage integration).
- No backend changes in MVP.
- Data validation rules:
  - `title` is required.
  - `priority` must be one of `P1`, `P2`, or `P3`.
  - Invalid `dueDate` values are ignored and treated as absent.

---

## 3. Post-MVP Scope

- Visually highlight overdue tasks (for example, red styling) so they stand out.
- Introduce task sorting order:
  - Overdue tasks first.
  - Then by priority (`P1` then `P2` then `P3`).
  - Then by due date ascending.
  - Tasks without due dates last.
- Add visual priority badge color coding:
  - `P1` red.
  - `P2` orange.
  - `P3` gray.

---

## 4. Out of Scope

- Notifications/reminders.
- Recurring tasks.
- Multi-user support.
- Keyboard navigation and additional accessibility enhancements.
- External storage integrations.
- Any backend persistence or API changes.
