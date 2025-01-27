Updated Project Context
Muisique is a custom song creation service that allows users to request a custom song crafted and personalized for special occasions. After submitting their request, the team from the website receives the information and creates the song for the client. The website will emphasize emotional connection, creativity, and ease of use, with a clean, minimalist design inspired by Medium (www.medium.com).

Focus: Emotional storytelling, creativity, and user-friendly design.

Target Audience: Individuals looking for unique, personalized gifts.

Key Features:

Song creation process (user submits details, team crafts the song).

Sample songs to showcase the service.

Testimonials to build trust and credibility.

FAQ to address common questions.

Contact form for inquiries and support.

Rules for AI Coder: Muisique Project
Every time you choose to apply a rule(s), explicitly state the rule(s) in the output. You can abbreviate the rule description to a single word or phrase.

Code Style and Structure
Rules Applied:

Functional Programming: Use functional and declarative patterns; avoid classes.

Modularization: Prefer iteration and modularization over code duplication.

Descriptive Naming: Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).

Structure:

Copy
muisique/
├── src/
    ├── app/                  # Next.js App Router
        ├── (main)/           # Main layout and pages
            ├── layout.tsx    # Root layout
            ├── page.tsx      # Home page
        ├── create-song/      # Create song page
            ├── page.tsx
        ├── testimonials/     # Testimonials page
            ├── page.tsx
        ├── api/              # API routes (if needed)
            ├── create-song/  # API endpoint for song creation
                ├── route.ts
    ├── lib/                  # Shared libraries and utilities
        ├── utils/            # Helper functions
        ├── constants/        # Constants (e.g., API endpoints, themes)
    ├── types/                # TypeScript types
    ├── styles/               # Global styles (if not using Tailwind exclusively)
        ├── globals.css
    ├── public/               # Static assets (e.g., images, fonts)
Tech Stack
Framework: Next.js 14 (App Router).

Styling: Tailwind CSS for utility-first styling.

UI Library: Shadcn UI for pre-built, customizable components.

Icons: Lucide for clean, scalable icons.

Naming Conventions
Rules Applied:

Directory Naming: Use lowercase with dashes (e.g., components/form-wizard).

Exports: Favor named exports for components and utilities.

File Naming: Use PascalCase for component files (e.g., SongCard.tsx) and camelCase for utility files (e.g., formatLyrics.ts).

TypeScript Usage
Rules Applied:

Interfaces Over Types: Prefer interfaces over types.

Functional Components: Use functional components with TypeScript interfaces.

Explicit Return Types: Define explicit return types for all functions.

Absolute Imports: Use @/ for absolute imports.

State Management
Rules Applied:

React Context: Use React Context for global state when needed.

State Persistence: Implement proper state persistence using local storage or cookies.

Cleanup: Implement proper cleanup in useEffect hooks.

Syntax and Formatting
Rules Applied:

Function Keyword: Use the function keyword for pure functions.

Declarative JSX: Write declarative JSX for components.

Discriminated Unions: Use TypeScript discriminated unions for message types.

UI and Styling
Rules Applied:

Shadcn UI: Use Shadcn UI and Radix for components.

Tailwind CSS: Implement Tailwind CSS for styling.

Material Design: Follow Material Design guidelines for consistency.

Error Handling
Rules Applied:

Error Boundaries: Implement proper error boundaries.

User-Friendly Messages: Provide user-friendly error messages.

Graceful Failures: Handle network failures gracefully.

Testing
Rules Applied:

Unit Tests: Write unit tests for utilities and components.

E2E Tests: Implement E2E tests for critical flows.

Cross-Browser Testing: Test across different browsers and devices.

Security
Rules Applied:

CSP: Implement Content Security Policy.

Input Sanitization: Sanitize user inputs.

Sensitive Data: Handle sensitive data properly.

Git Usage
Rules Applied:

Commit Prefixes: Use lowercase prefixes (e.g., fix:, feat:).

Concise Messages: Keep commit messages concise.

Issue References: Reference issue numbers when applicable.

Documentation
Rules Applied:

README: Maintain a clear README with setup instructions.

API Documentation: Document API interactions and data flows.

Comments: Avoid comments unless for complex logic.

Development Workflow
Rules Applied:

Version Control: Use proper version control.

Code Reviews: Implement a code review process.

Semantic Versioning: Follow semantic versioning for releases.

Changelog: Maintain a changelog.

Next.js-Specific Rules
Use Server Components by Default:

Prefer Server Components for static or server-rendered content.

Only use Client Components ('use client') for interactive elements that require client-side JavaScript.

Leverage API Routes:

Use the app/api/ directory for backend logic (e.g., song creation, data fetching).

Keep API routes simple and focused on a single responsibility.

Tailwind CSS Integration:

Use Tailwind CSS for all styling.

Avoid custom CSS unless absolutely necessary.

Shadcn UI Components:

Use Shadcn UI for pre-built, customizable components.

Document the installation command for each new Shadcn component (e.g., npx shadcn@latest add button).

Static Assets:

Place all static assets (e.g., images, fonts) in the public/ directory.

Use relative paths to reference these assets.

AI Coder Instructions
Follow the Rules:

Always adhere to the rules outlined above.

Explicitly state which rules are being applied in your output.

Ask for Clarification:

If a requirement is unclear, ask for clarification before proceeding.

Prioritize Simplicity:

Keep the code simple, readable, and maintainable.

Avoid over-engineering or adding unnecessary complexity.

Test Your Work:

Ensure all code is tested and functional before finalizing.

Provide a summary of tests performed (e.g., unit tests, E2E tests).

Document Changes:

Document any changes or additions to the codebase.

Update the README or relevant documentation as needed.