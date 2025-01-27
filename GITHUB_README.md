# Musique App

A modern, responsive web application for discovering and playing music samples. Built with Next.js and React, featuring a beautiful UI with smooth animations and an intuitive user experience.

## 🚀 Technologies Used

- **Frontend Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI
- **TypeScript**: For type safety
- **Development Tools**: ESLint, PostCSS, Autoprefixer

## ⚡️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn

You can check your versions by running:
```bash
node --version
npm --version
```

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/musique-app.git
cd musique-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add any required environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 🚀 Running the Project

### Development Mode
To run the project in development mode with hot-reload:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build
To create and run a production build:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Linting
To run the linter:
```bash
npm run lint
# or
yarn lint
```

## 📁 Project Structure

```
musique-app/
├── components/        # Reusable UI components
├── pages/            # Next.js pages and API routes
├── public/           # Static files
├── styles/           # Global styles and Tailwind config
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── ...config files
```

## 🔧 Troubleshooting

### Common Issues

1. **Installation Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

2. **Build Errors**
   - Ensure all dependencies are installed
   - Clear Next.js cache: 
     ```bash
     rm -rf .next
     npm run build
     ```

3. **Styling Issues**
   - Run `npm run dev` to ensure Tailwind is generating styles
   - Check if your file is imported in `globals.css`

### Debug Mode
To run the app in debug mode, use:
```bash
NODE_OPTIONS='--inspect' npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

## 🔗 Links

- [Live Demo](https://your-demo-link.com)
- [Documentation](https://your-docs-link.com)
- [Report Bug](https://github.com/yourusername/musique-app/issues)
- [Request Feature](https://github.com/yourusername/musique-app/issues)
