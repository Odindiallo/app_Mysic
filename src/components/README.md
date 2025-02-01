# Musique App Components

This directory contains all the React components used in the Musique App. The components are organized following a modular and scalable architecture.

## Directory Structure

```
components/
├── buttons/           # Reusable button components
├── forms/            # Form components and form-related utilities
├── layout/           # Layout components (header, footer, etc.)
├── modals/           # Modal dialogs and overlays
├── navigation/       # Navigation components
├── sections/         # Page sections (hero, features, etc.)
└── ui/              # Base UI components from shadcn/ui
```

## Component Guidelines

1. **Component Organization**
   - Each component should be in its own directory with associated tests
   - Use index.ts files for clean exports
   - Keep components focused and single-responsibility

2. **Naming Conventions**
   - Use PascalCase for component files
   - Use kebab-case for directories
   - Suffix test files with .test.tsx

3. **Code Style**
   - Use functional components with TypeScript
   - Follow the project's ESLint and Prettier configuration
   - Include proper JSDoc documentation for complex components

4. **State Management**
   - Use Zustand for global state
   - Prefer local state for component-specific data
   - Document state dependencies in component comments

5. **Testing**
   - Write unit tests for all components
   - Include accessibility tests
   - Test user interactions and edge cases

6. **Performance**
   - Use React.memo for expensive renders
   - Implement proper cleanup in useEffect
   - Avoid unnecessary re-renders

7. **Accessibility**
   - Follow WCAG 2.1 guidelines
   - Include proper ARIA attributes
   - Ensure keyboard navigation

## Component Categories

### UI Components
Base UI components from shadcn/ui, customized for Musique's design system.

### Layout Components
Components that define the overall structure of the application.

### Form Components
Components for handling user input and form submissions.

### Modal Components
Dialog components for overlays and popups.

### Section Components
Larger components that make up main page sections.

## Best Practices

1. **Props**
   - Use TypeScript interfaces for prop definitions
   - Document required vs optional props
   - Include prop validation where necessary

2. **Styling**
   - Use Tailwind CSS for styling
   - Follow the project's design tokens
   - Maintain responsive design principles

3. **Error Handling**
   - Implement proper error boundaries
   - Handle loading and error states
   - Provide meaningful error messages

4. **Documentation**
   - Include JSDoc comments for complex logic
   - Document component usage examples
   - Keep README files updated

## Adding New Components

1. Create a new directory in the appropriate category
2. Create the component file (ComponentName.tsx)
3. Create a test file (ComponentName.test.tsx)
4. Export the component through index.ts
5. Add documentation in the component's README.md
6. Write comprehensive tests
7. Update this README if adding a new category

## Testing

Run tests using:
```bash
npm test
```

For component-specific tests:
```bash
npm test -- components/path/to/component
```
