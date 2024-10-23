# WalletX

To start the project "walletX," here’s a step-by-step guide. Here’s what you need to do:

### Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (Preferably the LTS version)
2. **npm** or **yarn** (You can choose between npm and yarn for managing dependencies. I’ll assume you’re using npm based on your structure.)
3. **Git** for version control.

### Step-by-Step Setup

#### Step 1: Install Dependencies

At the root level, there’s a `package.json` file that defines dependencies for the entire project. Run the following command in the root directory (`walletX`) to install all the dependencies.

```bash
npm install
```

If you’re using **yarn** instead, run:

```bash
yarn install
```

This will install dependencies for all the apps and packages in your project.

#### Step 2: Check `turbo.json` Configuration

If Turborepo isn't installed globally yet, install it using:

```bash
npm install turbo -g
```

Then run the Turborepo commands:

```bash
turbo run build
```

This will build all the apps and packages in the correct order.

#### Step 3: Configure and Migrate the Database (if using Prisma)

We're using Prisma with PostgreSQL for database, so the next step is to make sure your database is properly configured and migrated.

1. Make sure the database is up and running.
2. Navigate to the `packages/db/` directory and run the migrations.

```bash
npx prisma migrate deploy
```

This will apply the migrations from your `migrations` folder to your database. You can also generate the Prisma client:

```bash
npx prisma generate
```

#### Step 4: Set Up Environment Variables

For your apps, especially the `user-app`, you might need to set up environment variables. Create `.env` files in the respective apps to hold sensitive information like API keys, database URLs, etc.

Check the example `.env.example` file.

1. Navigate to the `packages/db/` directory and add a `.env` file:

   ```bash
   DATABASE_URL="postgresql-db-url"
   DIRECT_URL="your-db-direct-url"
   ```

2. Navigate to the `apps/user-app/` directory and add a `.env` file:

   ```bash
   JWT_SECRET="your-secret-key"
   NEXTAUTH_URL="your-app-url"

   Firebase Configuration Keys
   ```

Make sure your `.gitignore` includes `.env` to prevent committing sensitive data.

#### Step 5: Run the Development Servers

For your different apps, you can start the development servers separately:

- **User-App (Next.js)**

  Navigate to the `apps/user-app/` directory and start the development server:

  ```bash
  npm run dev
  ```

  This will start the Next.js app for the user interface. You can access it in your browser, usually at `http://localhost:3000`.

- **Bank-Webhook (Node.js or Express app)**

  Navigate to the `apps/bank-webhook/` directory and start the webhook service:

  ```bash
  npm run dev
  ```

  (Ensure that the `package.json` in the `bank-webhook` directory includes a `dev` script for starting the server in development mode.)

Make sure your `tsconfig.json` files are set up correctly for each package and app so TypeScript types are being checked.

#### Step 8: Deployment (Optional)

If you’re planning to deploy, ensure that you have appropriate deployment scripts in place. Since you’re using Next.js for `user-app`, you can deploy it to services like Vercel, Netlify, or your own server. For the backend webhook, services like AWS Lambda, or a Node.js server on a platform like Heroku or DigitalOcean, would work well.

---
