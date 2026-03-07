# PC Store Inventory Management

This project uses Next.js + Prisma + MongoDB.

## Prerequisites

- Node.js 18+
- Docker Desktop (required for local MongoDB replica set)

## Local Database (Replica Set)

Prisma's MongoDB connector requires a replica set, even in development.

1. Start MongoDB and initialize a single-node replica set:

```bash
docker compose up -d
```

2. Ensure `DATABASE_URL` is set in `.env`:

```env
DATABASE_URL="mongodb://localhost:27017/pc-store-inventory-management?replicaSet=rs0&directConnection=true"
```

3. Generate Prisma client:

```bash
npx prisma generate
```

## Run App

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Common Fix

If you see Prisma error `P2031` (`MongoDB server must be run as a replica set`), run:

```bash
docker compose down -v
docker compose up -d
```
