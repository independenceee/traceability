# Traceability Platform

A modern, full-featured supply chain traceability platform built with Next.js, TypeScript, Tailwind CSS, and Prisma. This project enables transparent asset management, service subscriptions, payments, access control, QR code generation, and mobile app distribution.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Requirements](#requirements)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [User Flows](#user-flows)
- [API & UI Overview](#api--ui-overview)
- [Subscription & Payment Logic](#subscription--payment-logic)
- [Access Control](#access-control)
- [QR Code & App Download](#qr-code--app-download)
- [Docker & Deployment](#docker--deployment)
- [Troubleshooting](#troubleshooting)
- [Contribution](#contribution)
- [License](#license)

---

## Features
- **Service Management**: Create, update, delete, and list services and subscriptions. Admins can define service plans, pricing, and durations.
- **Subscription & Payment**: Users can subscribe, renew, or upgrade services. Payments are processed via Cardano (ADA) blockchain, with transaction hashes stored for traceability.
- **Access Control**: All key features (minting, utilities, services) are protected and only accessible to users with an active subscription. UI and backend both enforce access rules.
- **QR Code Generator**: Generate QR codes for mobile app download (APK, App Store, Google Play). QR codes are branded and can be scanned by any device.
- **Collection & Utilities**: Organize and manage asset collections, upload and manage files, and use utility tools for supply chain management.
- **Mobile App Download**: Distribute the Android APK directly, or link to App Store/Google Play. Download links and QR codes are always up-to-date.
- **Dockerized**: All services can be run in Docker containers for easy deployment and scaling. Includes production and development Dockerfiles.

## Tech Stack
- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM (PostgreSQL)
- **Authentication**: NextAuth.js (supports social and wallet login)
- **Blockchain**: Cardano Mesh SDK for on-chain payments and asset management
- **Other**: Docker, Docker Compose, Husky (git hooks), Jest (testing)

## Architecture Overview
- **Monorepo**: All client, contract, and schema code in a single repository for easy management.
- **Prisma ORM**: Centralized data model for users, services, subscriptions, payments, products, collections, and more. See `prisma/schema.prisma` for details.
- **Next.js App Router**: Modern routing, server components, and API endpoints. All business logic is colocated with UI for maintainability.
- **Access Control**: Implemented at both UI (menu-list, route guards) and backend (API checks). Unauthorized users are redirected or shown disabled UI.
- **Payment Logic**: Cardano blockchain integration for secure, auditable payments. Transaction hashes are stored and verified.
- **Mobile App Distribution**: APK is placed in `public/`, QR code generator and store badges are in the UI. Download page and QR code generator are always in sync.

## Requirements
- Node.js 20+
- PostgreSQL (local or cloud)
- (Optional) Docker & Docker Compose for containerized deployment
- Cardano wallet (for payment testing)

## Setup & Installation
### 1. Clone & Install
```sh
git clone <repo-url>
cd client
npm install
```

### 2. Configure Environment
- Copy `.env.example` to `.env` and fill in all required variables:
  - `DATABASE_URL` (PostgreSQL connection string)
  - `BLOCKFROST_API_KEY`, `KOIOS_TOKEN` (Cardano API keys)
  - `NEXT_PUBLIC_APP_NETWORK` (mainnet, preview, preprod)
  - `NEXT_PUBLIC_APP_URL_MAINNET`, `NEXT_PUBLIC_APP_URL_PREVIEW`
  - `IPFS_ENDPOINT`, `NEXT_PUBLIC_IPFS_GATEWAY` (optional)

### 3. Prisma Migration
```sh
npx prisma generate
npx prisma migrate dev
```

### 4. Run Locally
```sh
npm run dev
```
- The app will be available at `http://localhost:3000` by default.

## Environment Variables
All environment variables are documented in `src/constants/app-environment.ts` and `.env.example`.
- `DATABASE_URL` - PostgreSQL connection string
- `BLOCKFROST_API_KEY`, `KOIOS_TOKEN` - Cardano blockchain API keys
- `NEXT_PUBLIC_APP_NETWORK` - Network selection (mainnet, preview, preprod)
- `NEXT_PUBLIC_APP_URL_MAINNET`, `NEXT_PUBLIC_APP_URL_PREVIEW` - Public URLs for different networks
- `IPFS_ENDPOINT`, `NEXT_PUBLIC_IPFS_GATEWAY` - For IPFS integration (optional)

## Folder Structure
- `src/app` - Next.js app routes & pages (dashboard, services, utilities, etc.)
- `src/components` - UI components (menu, QR code, subscription, etc.)
- `src/services` - Business logic (CRUD, payment, subscription, access control)
- `prisma/` - Prisma schema & migrations
- `public/` - Static files (APK, images, QR badges, store badges)
- `contract/` - Cardano smart contract scripts (Aiken)

## User Flows
### 1. Subscription & Payment
- **Step 1:** User logs in or registers (NextAuth.js, wallet or social login)
- **Step 2:** User navigates to Services page and selects a service plan
- **Step 3:** User initiates payment (ADA via Cardano wallet). The UI guides the user through wallet connection and transaction signing.
- **Step 4:** On successful payment, the backend verifies the transaction and creates/renews the subscription in the database. Payment details (amount, txHash, date) are stored for audit.
- **Step 5:** User can view, renew, or upgrade their subscription at any time. Upgrades to more expensive plans are handled with proration and correct end date calculation.

### 2. Access Control
- **Step 1:** On login, the app checks the user's subscription status via API.
- **Step 2:** Menu items and routes (mint, home, utilities, services) are enabled/disabled based on subscription status. This is enforced in both UI (`menu-list.tsx`) and backend (API route guards).
- **Step 3:** If a user without an active subscription tries to access a protected route, they are redirected to the subscription/payment page or shown a disabled UI.

### 3. QR Code & App Download
- **Step 1:** User navigates to the QR code generator or download page.
- **Step 2:** The app displays QR codes for APK, App Store, and Google Play download links. Store badges are shown for easy access.
- **Step 3:** The APK file is placed in `public/app-release.apk` for direct download. App Store and Google Play links are configurable.
- **Step 4:** Users scan the QR code with their mobile device to download or install the app.

### 4. Collection & Utilities
- **Step 1:** User manages collections and assets via the utilities section.
- **Step 2:** Users can upload files, manage metadata, and use utility tools for supply chain management.

## API & UI Overview
- **Service CRUD**: `/dashboard/services` (list, create, update, delete services)
- **Subscription Page**: `/dashboard/services/subscription` (view current status, renew, upgrade)
- **Payment Page**: `/dashboard/services/payment` (initiate and confirm payment)
- **Collection Management**: `/dashboard/utilities/collection` (manage asset collections)
- **QR Code Generator**: `/dashboard/utilities/qrcode` (generate and download QR codes)
- **APK Download**: `/download` (direct APK download or via QR code)
- **Access Control**: All protected routes check subscription status before rendering content.

## Subscription & Payment Logic
- All payment and subscription logic is implemented in `src/services/database/payment/index.ts`.
- **New Subscription:**
  - User selects a plan and pays via Cardano wallet.
  - Backend verifies payment and creates a new subscription record.
- **Renewal:**
  - If the user already has a subscription, the end date is extended.
- **Upgrade:**
  - If the user upgrades to a more expensive plan, the system calculates the new end date and updates the subscription accordingly.
- **Payment Records:**
  - All payments are recorded with user ID, subscription ID, amount, currency, txHash, and payment date.
- **Access Control:**
  - Subscription status is checked before allowing access to protected features/routes.

## Access Control
- **UI Enforcement:**
  - Menu and routes are dynamically enabled/disabled based on subscription status. See `src/components/menu-list.tsx` and `src/constants/routes.ts`.
  - Disabled menu items are visually distinct and cannot be clicked.
- **Backend Enforcement:**
  - API routes check subscription status before processing requests.
  - Unauthorized users are redirected or shown an error message.

## QR Code & App Download
- **QR Code Generator:**
  - Implemented in `src/components/qrcode-generator.tsx`.
  - Generates QR codes for APK, App Store, and Google Play download links.
  - Store badges are in `public/assets/` and displayed alongside QR codes.
- **APK Download:**
  - Place the latest APK in `public/app-release.apk`.
  - The download page and QR code generator will automatically link to the latest APK.
- **App Store/Google Play:**
  - Links are configurable and displayed with QR codes and badges.

## Docker & Deployment
- **Build & run with Docker:**
  ```sh
  docker-compose up --build
  ```
- **Dockerfile** and **docker-compose.yml** are provided for both production and local development.
- **Port Configuration:**
  - The app runs on port 3000 by default. Change `APP_PORT` in `.env` or `docker-compose.yml` if needed.
- **Database:**
  - Ensure PostgreSQL is running and accessible from the container.
- **Production Deployment:**
  - Use `Dockerfile` for production builds. For Portainer or other orchestrators, use `Dockerfile.portainer` and `docker-compose-portainer.yml`.

## Troubleshooting
- **Database Issues:**
  - Ensure PostgreSQL is running and `DATABASE_URL` is correct.
  - Run `npx prisma migrate dev` to apply migrations.
- **Docker Issues:**
  - Check for port conflicts and ensure all services are healthy.
  - Use `docker-compose logs` to view logs and debug issues.
- **Payment/Subscription Issues:**
  - Check Cardano API keys and network settings.
  - Ensure the wallet is funded and connected.
  - Review logs for errors in payment or subscription flows.
- **General Debugging:**
  - Use `npm run lint` to check for code issues.
  - Use `npm run test` to run tests (if implemented).
  - Check browser console and server logs for errors.

## Contribution
We welcome contributions from the community! To contribute:
1. Fork the repository and create a new branch for your feature or bugfix.
2. Write clear, well-documented code and include tests if possible.
3. Run `npm run lint` and ensure all checks pass.
4. Submit a pull request with a clear description of your changes.
5. For major changes, please open an issue or discussion first.

## License
MIT. See [LICENSE](LICENSE) for details.
