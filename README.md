# FINZA — Accounting Web App

FINZA is a lightweight accounting platform for small businesses. It offers Google-based authentication, invoicing with email delivery, expense capture, VAT and profit reporting, and dual-currency support in English and Swedish.

## Stack

- **Frontend** – React + Vite with i18next for localisation and Supabase authentication helpers.
- **Backend** – Express with Supabase for persistence and SendGrid for transactional email.

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with `invoices` and `expenses` tables (see below)
- A SendGrid API key for invoice notifications

### Supabase Schema

Create the following tables (SQL simplified):

```sql
create table invoices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  client_name text not null,
  client_email text not null,
  invoice_number text not null,
  total numeric not null,
  currency text not null default 'SEK',
  secondary_currency text not null default 'GHS',
  issued_at timestamptz default now()
);

create table expenses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  merchant text not null,
  category text not null,
  amount numeric not null,
  currency text not null default 'SEK',
  secondary_currency text not null default 'GHS',
  incurred_at timestamptz default now()
);
```

Enable Row Level Security and add policies that allow users to read and write rows where `user_id = auth.uid()`.

### Backend

```bash
cd backend
cp .env.example .env # update with your credentials
npm install
npm run dev
```

Endpoints are mounted under `/api` with resources for invoices, expenses, reports, configuration and authentication helpers.

### Frontend

```bash
cd frontend
cp .env.example .env # optional – set Vite Supabase envs
npm install
npm run dev
```

The Vite dev server proxies API traffic to `http://localhost:4000`.

### Environment Variables

See `backend/.env.example` for API credentials. Important keys include Supabase URL/keys, SendGrid API key, `CLIENT_APP_URL` for OAuth redirects, and base/secondary currency settings. The frontend optionally reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Scripts

| Location  | Command        | Description                         |
|-----------|----------------|-------------------------------------|
| backend   | `npm run dev`  | Start Express API with Nodemon      |
| backend   | `npm run lint` | Lint backend source with ESLint     |
| frontend  | `npm run dev`  | Launch Vite development server      |
| frontend  | `npm run build`| Build production bundle             |

## License

MIT
