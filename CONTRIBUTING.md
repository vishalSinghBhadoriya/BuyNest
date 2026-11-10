# Contributing to productService App

Thank you for your interest in contributing to productService! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js (version 20.19+ or 22.12+)
- npm or yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/productService-app.git
   cd productService-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use ESLint for code linting
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic

### Component Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React Context providers
├── hooks/         # Custom React hooks
├── api/           # API service functions
└── utils/         # Utility functions
```

### Styling

- Use Tailwind CSS for styling
- Follow the glassmorphism design system
- Ensure dark mode compatibility
- Make components responsive

### Testing

- Write unit tests for utility functions
- Test component behavior
- Ensure accessibility compliance

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

### PR Guidelines

- Use descriptive commit messages
- Keep PRs focused and small
- Include screenshots for UI changes
- Update README if adding new features

## Feature Requests

When suggesting new features:

1. Check existing issues first
2. Provide a clear description
3. Explain the use case
4. Consider implementation complexity

## Bug Reports

When reporting bugs:

1. Use the bug report template
2. Include steps to reproduce
3. Provide expected vs actual behavior
4. Include browser/device information

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards

## Questions?

Feel free to open an issue for questions or discussions about the project.

Thank you for contributing! 🚀
