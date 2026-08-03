# Task Manager Application

A modern, responsive Task Management Web Application built with React, TypeScript, React-Bootstrap, and Auth0. This application allows users to view, create, edit, and delete tasks with global state management and user authentication.

## Features

- **User Authentication:** Secure log in and log out powered by Auth0.
- **Task Dashboard:** View all tasks organized in a clean card layout.
- **Task Creation & Editing:** Modal-based creation and detailed view for inline task modification.
- **Form Validation & Error Handling:** Real-time feedback and validation rules for task submission.
- **Global State Management:** Context API with typed custom hooks managing application state globally.
- **Responsive Design:** Styled using React-Bootstrap components.

## Tech Stack

- **Frontend Framework:** React (with Vite / CRA)
- **Language:** TypeScript
- **Styling:** React-Bootstrap & Bootstrap
- **Authentication:** Auth0 (`@auth0/auth0-react`)
- **State Management:** React Context API

## Architecture & Project Structure

```text
src/
├── components/
│   ├── NavigationBar.tsx    # Auth0 login/logout and user details
│   ├── TaskDashboard.tsx    # Main grid view for task cards
│   ├── TaskDetail.tsx       # Detailed view and edit mode for individual tasks
│   └── TaskFormModal.tsx    # Modal form for task creation with validation
├── context/
│   └── TaskContext.tsx      # Global state provider for managing task operations
├── types/
│   └── tasks.ts             # TypeScript interfaces for Task objects and form types
├── App.tsx                  # Root component handling authentication flow
└── main.tsx                 # Auth0Provider wrapper & entry point
```

## Installation & Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure Auth0: Update your Auth0 settings in `main.tsx` with your domain and client ID.
4. Run the development server: `npm run dev`

## Implementation Details

- **TypeScript:** Enforces strict typing across components, props, form events (`React.ChangeEvent`), and custom context hooks.
- **Error Handling:** Form inputs are validated prior to state dispatch, presenting alert banners for invalid inputs.
