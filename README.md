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
- **Admin panel powered by [AdminJS](https://adminjs.co/) at `/admin`**
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

Copy the example env file and edit as needed:

```bash
cp .env.example .env
```
Edit `.env` and set at least:
- `DATABASE_URL` (for your PostgreSQL, default works for Docker Compose)
- `JWT_SECRET` (change for production)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_COOKIE_SECRET` (for the AdminJS panel)

### 3. **Install Dependencies**

```bash
npm install
```

### 4. **Start with Docker Compose (Recommended)**

```bash
docker-compose up --build
```

- API: [http://localhost:4000](http://localhost:4000)
- Admin Panel: [http://localhost:4000/admin](http://localhost:4000/admin)
- Docs: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

### 5. **Login to Admin Panel**

Go to `/admin` and use the admin credentials set in your `.env` file.

---

## Development (without Docker)

1. Install PostgreSQL locally and create a database named `freelancer`
2. Set `.env` for your DB credentials
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

## **Admin Panel**

- Built-in with [AdminJS](https://adminjs.co/)
- Accessible at `/admin`
- Admin credentials are set in your `.env` file (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
- **Change default credentials before production!**
- Full DB CRUD, user/project management, and more.

---

## API Documentation

Interactive REST API docs: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## Adding/Extending Modules

1. Add your controller in `src/controllers/`
2. Add your routes in `src/routes/`
3. Register new route in `src/app.js`
4. Update Prisma schema if DB changes are needed, then run:
   ```bash
   npx prisma migrate dev --name your-migration-name
   ```
5. Test endpoints using Swagger, Postman, or the Admin panel

---

## Testing

- Use [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/) for unit/integration tests
- Use [SuperTest](https://github.com/visionmedia/supertest) for endpoint tests

---

## Deployment Tips

- Use a production PostgreSQL instance (e.g. AWS RDS, Azure, etc.)
- Set strong secrets in `.env`
- Use HTTPS in production (setup a reverse proxy if needed)
- Store file uploads on S3 or similar for production
- Restrict admin panel access to trusted users/IPs in production

---

## License

MIT
