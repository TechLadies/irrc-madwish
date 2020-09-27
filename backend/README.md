# Backend for IRRC student-teacher matching app.

This uses boilerplate code from https://github.com/TechLadies/nodejs-backend-starterkit.

## Initial setup steps for local development

0. Update `knexfile.js` with the correct database names for Development and Test databases.

1. Copy `env.sample` to `.env`

2. Prepare the databases

```
NODE_ENV=development npm run db:migrate
NODE_ENV=test npm run db:migrate
```

3. Prepare the seed data for development

`NODE_ENV=development npm run db:seed`

4. Start the app for local development

`npm run dev`

Visit `http://localhost:3001/users` to view the seeded user data (not all fields are shown).
