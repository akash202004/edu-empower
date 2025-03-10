
# Edu-Empower Frontend Documentation

This repository contains the frontend code for the **Edu-Empower** platform, a solution designed to streamline crowdfunding, scholarships, and donations for students. Built using **React** and **Vite**, the frontend ensures high performance and aligns with modern web development standards.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Key Files & Directories](#key-files--directories)
- [Components](#components)
  - [Navbar](#navbar)
  - [Hero](#hero)
  - [About](#About)
  - [Feature](#feature)
  - [Footer](#footer)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
  - [Linting](#linting)

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
    │   │   ├── Navbar/
    │   │   │   └── Navbar.jsx
    │   │   ├── Hero/
    │   │   │   └── Hero.jsx
    │   │   ├── About/
    │   │   │   └── About.jsx
    │   │   ├── Feature/
    │   │   │   └── Feature.jsx
    │   │   ├── Footer/
    │   │   │   └── Footer.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── vite.config.js
```

---

## Key Files & Directories

- **`index.html`**: The primary HTML entry point for the application.
- **`package.json`**: Defines metadata, dependencies, and available npm scripts.
- **`eslint.config.js`**: Configures ESLint to maintain consistent coding standards.
- **`vite.config.js`**: Configuration for Vite, the build tool used in the project.
- **`src/`**: Contains the main source code, including:
  - **`App.jsx`**: The root component for the React application.
  - **`main.jsx`**: The entry point for the React application.
  - **`index.css`**: Global CSS for styling.
  - **`components/`**: Contains reusable UI components such as Navbar, Hero, About, Feature, and Footer.

---

## Components

### Navbar
The `Navbar` component (located at `src/components/Navbar/Navbar.jsx`) is a fully responsive navigation bar utilizing:
- **[@headlessui/react](https://headlessui.dev/)** for accessible UI components.
- **[@heroicons/react](https://heroicons.com/)** for iconography.

It features:
- Dynamic navigation links for sections such as Crowd Funding, Scholarship, and Donation.
- A mobile-friendly dropdown menu.
- A prominent call-to-action button ("Explore Now").

#### Screenshot:
![Navbar Component](public/assets/screenshots/Navbar.png)

### Hero
The `Hero` component (located at `src/components/Hero/Hero.jsx`) is designed to provide a welcoming introduction to the platform. It includes:
- A tagline ("Innovative Solution for Students").
- A bold heading ("Connecting Students & Support").
- A modern, shadowed layout with responsive typography.

#### Screenshot:
![Hero Component](public/assets/screenshots/Hero.png)

### About
The `EducationFunding` component (located at `src/components/About/About.jsx`) highlights various educational funding options. It features:
- An introductory section detailing how students can access scholarships, microloans, and other resources.
- Icons for microloans, grants, and mentorship programs.
- A call-to-action button for users to begin their journey with Edu-Empower.

#### Screenshot:
![About](public/assets/screenshots/About.png)

### Feature
The `Feature` component (located at `src/components/Feature/Feature.jsx`) emphasizes the unique features of the Edu-Empower platform. It includes:
- A list of benefits such as personalized recommendations, virtual counseling, career planning tools, and loan forgiveness options.
- Icons and text descriptions arranged in a responsive grid layout for easy readability.

#### Screenshot:
![Feature Component](public/assets/screenshots/Feature.png)

### Footer
The `Footer` component (located at `src/components/Footer/Footer.jsx`) provides essential information and user engagement options. It includes:
- Links to peer support, skill-sharing opportunities, and mental health resources.
- An email subscription form to keep users informed about updates and new features.
- Contact information, including a support email address and phone number.

#### Screenshot:
![Footer Component](public/assets/screenshots/Footer.png)

---

## Getting Started

### Prerequisites
Ensure you have the following software installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/akash202004/Edu-Empower.git
   cd Edu-Empower/Frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Development
To start the development server:
```sh
npm run dev
```
This will launch the Vite development server and open the application in your default browser.

### Building for Production
To build the application for production:
```sh
npm run build
```
The production-ready files will be generated in the `dist/` directory.

### Linting
To lint the code and ensure code quality:
```sh
npm run lint
```

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---