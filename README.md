# sas-node-backend

A production-ready Node.js (Express.js) backend for a freelancer hiring platform, using Prisma + PostgreSQL, JWT authentication, RBAC, Docker Compose, and ready for deployment.

---

## Features

- Express.js REST API (modular, clean)
- PostgreSQL with Prisma ORM (type-safe, scalable)
- JWT authentication (httpOnly cookies)
- Role-Based Access Control (RBAC) for Customer, Developer, Consultant, Admin
- Multi-step Project Submission, Assignment, Milestones, Payments
- File upload, Messaging, Notifications
- Analytics endpoints
- Swagger/OpenAPI docs (`/api/docs`)
- Docker Compose for easy local/dev setup

---

## Quick Start

### 1. **Clone the Repository**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/sas-node-backend.git
cd sas-node-backend
```

### 2. **Set Environment Variables**

Copy the example env file:

```bash
cp .env.example .env
```

### 3. **Start with Docker Compose**

```bash
docker-compose up --build
```

- API: [http://localhost:4000](http://localhost:4000)
- Docs: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## Development (without Docker)

1. Install PostgreSQL locally
2. Edit `.env` for your DB credentials
3. Install dependencies:

   ```bash
   npm install
   ```

4. Run Prisma migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. Start backend:

   ```bash
   npm run dev
   ```

---

## API Documentation

See `/api/docs` after running.

---

## License

MIT
