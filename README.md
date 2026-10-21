## Sistem Skrining Kesehatan Klinis (On-Progress)

## Tech Stack

* **Backend:** FastAPI (Python), SQLAlchemy ORM, Asyncpg / Psycopg3
* **Database:** PostgreSQL
* **Frontend:** React.js, Bootstrap 5 / Custom CSS
* **API Testing dan Tools:** Postman, Git

## Arsitektur dan Desain Sistem

Aplikasi ini menerapkan (*Separation of Concerns*) di sisi backend:

1. **Presentation Layer (Routes / Endpoints) :** Menangani *request/response* HTTP dan validasi parameter.
2. **Business Logic Layer (Services) :** Memproses alur logika bisnis sistem.
3. **Data Access Layer (Repository) :** Melakukan hubungan langsung dengan database PostgreSQL menggunakan SQLAlchemy ORM secara asynchronous.

---