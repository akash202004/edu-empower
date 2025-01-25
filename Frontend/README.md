
```markdown
# Edu-Empower Frontend

This repository hosts the frontend code for the **Edu-Empower** project, a platform designed to facilitate crowdfunding, scholarships, and donations. The frontend is built using **React** and **Vite** to ensure high performance and modern development standards.

---

## Project Structure

```plaintext
Edu-Empower/
  Frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public/
    ├── README.md
    ├── src/
    │   ├── App.jsx
    │   ├── assets/
    │   ├── components/
    │   │   └── Navbar/
    │   │       ├── Example.js
    │   │       └── Navbar.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── vite.config.js
```

### Key Files and Directories

- **`index.html`**: The main HTML file that includes the root `<div>` for the React application.
- **`package.json`**: Defines project metadata, scripts, and dependencies.
- **`eslint.config.js`**: Configuration file for ESLint to maintain code quality.
- **`vite.config.js`**: Configuration file for Vite, the build tool.
- **`src/`**: Contains the source code for the application, including:
  - **`App.jsx`**: The root component for the React application.
  - **`main.jsx`**: The entry point for the React application.
  - **`index.css`**: Global CSS file for styling.
  - **`components/Navbar/Navbar.jsx`**: Contains the `Navbar` component, built with `@headlessui/react` and `@heroicons/react`.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

---

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/Edu-Empower.git
   cd Edu-Empower/Frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

---

### Development

To start the development server, run:
```sh
npm run dev
```
This will start the Vite development server and open the application in your default web browser.

---

### Building for Production

To build the application for production, run:
```sh
npm run build
```
The production-ready files will be generated in the `dist/` directory.

---

### Linting

To lint the code and enforce consistent style, run:
```sh
npm run lint
```

---

## Components

### Navbar

The `Navbar` component, located at `src/components/Navbar/Navbar.jsx`, is a responsive navigation bar built using:
- **[@headlessui/react](https://headlessui.dev/)**: For disclosure functionality.
- **[@heroicons/react](https://heroicons.com/)**: For the iconography.

It is designed with Tailwind CSS for styling and includes features such as:
- Dynamic navigation links.
- Mobile-responsive dropdown functionality.
- A prominent call-to-action button ("Explore Now").

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

