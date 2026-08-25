# MazingiraHub Frontend

MazingiraHub is a planned environmental giving platform that connects donors with verified organisations working on conservation and community-led environmental projects across Kenya. The frontend will help visitors discover organisations and impact stories, make one-time or recurring donations, and follow the results of their giving.

> **Project status:** This repository is currently an early frontend scaffold. The Vite entry point and Tailwind CSS integration are in place, but the application routes, pages, components, services, authentication, payments, and dashboards have not been implemented yet. The product flows described below come from the design documentation and represent the intended experience.

## Product experience

The design documents describe four types of users:

- **Visitors:** Browse the home page, organisations, stories, and "How It Works" content; they may also start a donation as a guest.
- **Donors:** Sign in to view their dashboard, donation history, recurring donations, supported organisations, impact stories, and profile.
- **Organisation users:** Sign in to manage organisation information, projects, donations, donors, beneficiaries, inventory, and stories.
- **Administrators:** Review organisation applications, manage organisations and users, monitor donations, and view reports.

### Public pages

- **Home:** Hero call to action, impact statistics, featured organisations, beneficiary stories, and donation calls to action.
- **Organisations:** Search and filter organisations by category and location, view organisation cards, and open organisation details.
- **Organisation details:** Organisation overview, location, projects, donation progress, supporter information, verification status, and a donation action.
- **Stories:** Environmental impact story cards and full story details.
- **How It Works:** The three-step journey: discover a cause, choose a gift, and follow the impact.
- **About:** MazingiraHub's mission, team, values, and impact.
- **Authentication:** Login and sign-up flows for registered users.

### Donation journey

The planned donation flow is:

1. Choose an organisation.
2. Select one-time or monthly giving.
3. Choose a preset amount or enter a custom amount.
4. Optionally make the donation anonymous.
5. Complete payment through a supported gateway, including Stripe, M-Pesa, or PayPal.
6. Show a confirmation screen and receipt, with an email receipt as an external follow-up.

## Technology

- [React](https://react.dev/) 19 for the user interface
- [Vite](https://vite.dev/) 8 for development and production builds
- [Tailwind CSS](https://tailwindcss.com/) 4 for styling
- [ESLint](https://eslint.org/) 10 with React Hooks and React Refresh rules
- JavaScript and JSX using native ES modules

No backend API, authentication provider, payment gateway, or environment-variable contract is configured in this repository yet.

## Getting started

### Prerequisites

- Node.js and npm. Use a current Node.js LTS release.
- Git, if you are contributing to the repository.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, normally `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

The compiled output is written to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

There is currently no automated test script configured in `package.json`.

## Repository structure

```text
.
├── docs/
│   ├── flowchart/                 # Product navigation and workflow diagrams
│   └── wireframes/                # Desktop and mobile page designs
├── src/
│   ├── App.jsx                    # Application entry component
│   ├── main.jsx                   # React root and global stylesheet entry
│   ├── index.css                  # Tailwind CSS import
│   ├── components/                # Shared UI building blocks
│   ├── context/                   # Authentication and theme state
│   ├── modals/                    # Authentication and donation dialogs
│   ├── pages/                     # Public and role-specific screens
│   │   ├── admin/                 # Administrator screens
│   │   ├── donor/                 # Donor screens
│   │   └── organisation/          # Organisation-user screens
│   └── services/                  # API, auth, donation, organisation, and story clients
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The directories and filenames establish the intended module boundaries. Most files are placeholders at this stage, so they should not be treated as working feature implementations yet.

## Design documentation

The product flow and responsive designs are stored locally so implementation can be checked against the agreed direction:

- [Website flow](docs/flowchart/flowchart%201.png) shows navigation from the landing page through public pages, authentication, donation confirmation, and role-specific dashboards.
- [Website flowchart](docs/flowchart/flowchart%202.png) maps user types, public content, donation steps, payment, and dashboard responsibilities.
- [Desktop and mobile wireframes](docs/wireframes/) cover the home page, organisations, stories, About, and How It Works views.
- The wireframes use a nature-focused visual direction: forest green, light mint backgrounds, strong calls to action, impact statistics, organisation cards, and responsive layouts.

## Planned implementation milestones

1. Establish application routing and shared layout components.
2. Implement the public pages and responsive navigation from the wireframes.
3. Add organisation and story data loading through the service layer.
4. Add authentication, protected routes, and role-based dashboard access.
5. Implement donation state, validation, payment-provider integration, confirmation, and receipts.
6. Build donor, organisation, and admin workflows.
7. Add loading, empty, and error states, then introduce focused automated tests and accessibility checks.

## Development notes

- Keep page-specific UI in `src/pages/` and reusable UI in `src/components/`.
- Keep network and persistence concerns in `src/services/`; do not place API calls directly in presentational components.
- Keep authentication and theme state in their respective context modules.
- Treat payment and authentication data as sensitive. Production integrations must use the backend or provider SDKs rather than exposing secrets in the browser.
- Keep the public donation experience usable on small screens, matching the mobile wireframes in `docs/wireframes/`.

## Contributing

1. Create a focused branch from `main`.
2. Install dependencies with `npm install`.
3. Make a focused change that follows the existing source boundaries and design documentation.
4. Run `npm run lint` and `npm run build` before opening a pull request.
5. Include screenshots or a short workflow description for user-facing changes, where useful.

Pull requests should explain what changed, how it was verified, and any backend or environment assumptions that remain.

## License

No license has been declared for this repository yet.
