# Database Schema

## Database
PostgreSQL (Neon Serverless)

## Tables

### users
(Managed by Better Auth)

- id: string (primary key)
- email: string (unique)
- name: string
- created_at: timestamp

---

### tasks
- id: integer (primary key)
- user_id: string (foreign key → users.id)
- title: string (not null)
- description: text (nullable)
- completed: boolean (default false)
- created_at: timestamp
- updated_at: timestamp

## Indexes
- Index on tasks.user_id
- Index on tasks.completed
