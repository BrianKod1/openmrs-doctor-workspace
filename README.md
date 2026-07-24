# OpenMRS Doctor Workspace

A small frontend technical demonstration built for an OpenMRS healthcare startup application.

## What it demonstrates

- React and TypeScript
- OpenMRS REST API integration
- TanStack React Query for server state
- Dynamic UI rendering from clinician preferences
- Tailwind CSS and Vite
- Preferences persisted with localStorage
- Typed API responses and visible error handling

## Local setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Confirm the OpenMRS URL and demo credentials.
4. Run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Architecture note

The browser calls `/openmrs-api`. During local development, Vite proxies that
request to `/openmrs/ws/rest/v1` on the configured OpenMRS server and adds Basic
Authentication from local environment variables. This keeps credentials out of
the React bundle.

For production, replace the development proxy with a small backend/BFF or secure
serverless function. Never expose OpenMRS credentials in `VITE_` environment
variables or client-side code.

## Suggested demo flow

1. Change prescription field visibility.
2. Switch between compact and detailed layouts.
3. Explain that preferences are saved per browser for this prototype.
4. Search for an anonymized patient.
5. Show React Query caching and the loading/error states in the code.
6. Explain how the same preference model could later be stored per OpenMRS user.

## Safety

This project is a learning prototype. It must not be used with real patient data
without proper authentication, authorization, privacy review, audit logging, and
health-data compliance controls.
