# Lead Management Application

A Next.js application for creating, retrieving, and updating leads. The application includes a public lead submission form and an authenticated internal lead management interface.

## Features

- **Public Lead Form**: A form where prospects can submit their information
- **Internal Lead Management**: A secure interface for viewing and managing submitted leads
- **Authentication**: Simple authentication for the internal dashboard
- **State Transitions**: Ability to transition leads through different states (PENDING, REACHED_OUT, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **Form Validation**: Custom form validation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/lead-management-app.git
cd lead-management-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the public lead form.

5. Access the admin interface at [http://localhost:3000/admin](http://localhost:3000/admin)
   - Use the following credentials for admin login:
     - Email: admin@example.com
     - Password: password123

## Project Structure

- `src/app`: Next.js app router files
  - `page.tsx`: Public lead form page
  - `admin/`: Admin dashboard
  - `api/`: API routes
- `src/components`: React components
  - `public/`: Components for the public form
  - `admin/`: Components for the admin dashboard
  - `ui/`: Reusable UI components
- `src/lib`: Utility functions and type definitions
- `src/mock`: Mock data and API implementations

## API Routes

- `GET /api/leads`: Get all leads
- `POST /api/leads`: Create a new lead
- `PATCH /api/leads?id={leadId}`: Update a lead's status

## Authentication

This project uses a simple authentication mechanism for demo purposes. In a production environment, you would want to implement a more robust solution like NextAuth.js.

## Future Improvements

- Implement a more robust authentication system
- Add search and filtering on the leads list
- Implement pagination for the leads list
- Create a notification system for new leads
