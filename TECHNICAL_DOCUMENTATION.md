# Freelancer Platform Backend – Technical Documentation

---

## 1. Overview

A scalable backend for a freelancer hiring platform built with **Node.js (Express)**, **Prisma ORM**, and **PostgreSQL**. Supports rapid feature extension, secure multi-role access, and is cloud/container ready.

**Tech Stack**
- Node.js (Express.js)
- PostgreSQL
- Prisma ORM
- JWT Auth (httpOnly cookies)
- Docker Compose (API + DB)
- Multer (file uploads)
- Swagger/OpenAPI (API docs)

---

## 2. Deployment

### Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_ORG/sas-node-backend.git
   cd sas-node-backend
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with secrets if needed
   ```

3. **Start All Services**
   ```bash
   docker-compose up --build
   ```

4. **Access**
   - API: `http://localhost:4000`
   - Docs: `http://localhost:4000/api/docs`

---

### Manual (Local Host)

1. Install PostgreSQL and create DB `freelancer`
2. Set `.env`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```
5. Start server:
   ```bash
   npm run dev
   ```

---

## 3. Directory Structure

```
sas-node-backend/
├── docker-compose.yml
├── package.json
├── Dockerfile
├── .env.example
├── prisma/
│   └── schema.prisma
└── src/
    ├── app.js
    ├── server.js
    ├── controllers/
    ├── middlewares/
    └── routes/
```

---

## 4. API Endpoints (Summary)

| Method | Endpoint                       | Description                  | Access      |
|--------|-------------------------------|------------------------------|-------------|
| POST   | /api/auth/register            | Register user (role)         | Public      |
| POST   | /api/auth/login               | Login                        | Public      |
| GET    | /api/auth/me                  | Get current user             | Auth        |
| POST   | /api/projects                 | Create project               | Customer    |
| GET    | /api/projects                 | List projects (role filtered)| Role-based  |
| GET    | /api/projects/:id             | Project details              | Assigned    |
| PUT    | /api/projects/:id             | Update project               | Assigned    |
| DELETE | /api/projects/:id             | Delete project               | Admin       |
| POST   | /api/projects/:id/assign      | Assign dev/consultant        | Admin       |
| POST   | /api/milestones/:projectId    | Add milestone                | Admin/Cons. |
| GET    | /api/milestones/:projectId    | List milestones              | Assigned    |
| PUT    | /api/milestones/:id           | Update milestone             | Assigned    |
| DELETE | /api/milestones/:id           | Delete milestone             | Admin/Cons. |
| POST   | /api/payments/:projectId      | Make payment                 | Customer    |
| GET    | /api/payments/:projectId      | List payments (project)      | Assigned    |
| GET    | /api/payments                 | All payments                 | Admin       |
| POST   | /api/files/:projectId         | Upload file                  | Assigned    |
| GET    | /api/files/:projectId         | List files                   | Assigned    |
| DELETE | /api/files/:fileId            | Delete file                  | Admin       |
| GET    | /api/messages/:projectId      | Get messages                 | Assigned    |
| POST   | /api/messages/:projectId      | Send message                 | Assigned    |
| GET    | /api/notifications            | List notifications           | Auth        |
| POST   | /api/notifications            | Send notification            | Admin       |
| GET    | /api/analytics/summary        | Analytics dashboard          | Admin/Cons. |
| ...    | ...                           | ...                          | ...         |

**For full API details, see `/api/docs` in your running app.**

---

## 5. How to Develop a New Module

### a) **Directory Structure**
- Add controller: `src/controllers/yourmodule.controller.js`
- Add route: `src/routes/yourmodule.routes.js`
- Register route in `src/app.js`

### b) **Sample Module Steps**
1. **Define Database Model** (edit `prisma/schema.prisma`)
2. **Run Prisma Migrate**
   ```bash
   npx prisma migrate dev --name add-yourmodule
   ```
3. **Create Controller** (business logic)
4. **Create Routes** (Express endpoints)
5. **Register Route** in `app.js`
6. **Test** with Postman/Swagger
7. **Document** endpoints in Swagger JSDoc

### c) **Deploy New Module**
- Commit changes
- Push to git repository
- Redeploy Docker Compose or production deployment as required

---

## 6. Testing

- **Unit testing:** Use [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/) for controller logic
- **Integration testing:** Use [SuperTest](https://github.com/visionmedia/supertest) for API endpoints
- **Manual testing:** Use Postman/Insomnia or Swagger docs

### Sample Jest Test (src/controllers/__tests__/auth.controller.test.js)
```js
import { register } from '../auth.controller';
test('register throws if missing fields', async () => {
  const req = { body: {} }, res = {}, next = jest.fn();
  await register(req, res, next);
  expect(next).toHaveBeenCalled();
});
```

---

## 7. Best Practices

- Always use RBAC middleware for protected endpoints
- Use Prisma input validation and sanitization
- Handle file uploads securely (scan, restrict types if going to production)
- Never commit secrets; use `.env` for all keys
- For email, implement a service (see Nodemailer sample in docs)
- Write and run tests before deploy

---

## 8. Adding Email Notifications

- Add a service (e.g. `src/services/email.service.js`)
- Use **Nodemailer** or a transactional API (SendGrid, SES, etc)
- Trigger emails in controllers on major events (assignments, payments, milestone updates, etc.)

---

## 9. Deployment Best Practices

- Use Docker for all environments (local, staging, prod)
- Consider using managed PostgreSQL in production (AWS RDS, Azure, etc.)
- Use HTTPS in production
- Store files in S3 or similar, not just local disk

---

## 10. Support

- For new features or issues, open a GitHub issue or contact the maintainers.

---
