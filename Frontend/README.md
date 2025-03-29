# Edu-Empower Frontend

<p align="center">
  <img src="public/logo.png" alt="Edu-Empower Logo" width="200" />
</p>

<p align="center">
  <strong>Bridging the Gap Between Students and Educational Support Resources</strong>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#key-components">Key Components</a> •
  <a href="#authentication-flow">Authentication Flow</a> •
  <a href="#api-integration">API Integration</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#performance-optimization">Performance Optimization</a> •
  <a href="#testing">Testing</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#troubleshooting">Troubleshooting</a> •
  <a href="#license">License</a>
</p>

## Overview

Edu-Empower is a comprehensive platform designed to democratize access to educational funding resources. The platform creates a seamless ecosystem connecting students with scholarships, crowdfunding opportunities, and donations from individuals and organizations committed to educational equity.

Our mission is to empower students by removing financial barriers to education, enabling them to focus on their academic journey rather than financial constraints. By providing a centralized hub for educational support, we aim to increase accessibility to higher education and vocational training for students from all backgrounds.

## Features

### For Students
- **Personalized Profile Management**: Comprehensive student information management with academic history and financial needs assessment
- **Scholarship Discovery**: Advanced search and filtering of scholarships based on eligibility criteria
- **Scholarship Application**: Streamlined application process with document upload capabilities
- **Application Tracking**: Real-time status updates on submitted applications
- **Crowdfunding Campaigns**: Tools to create and manage personal fundraising campaigns
- **Resource Center**: Educational content on financial literacy and scholarship application best practices

### For Organizations
- **Organization Dashboard**: Comprehensive administrative interface
- **Scholarship Creation**: Tools to define eligibility criteria, application requirements, and funding amounts
- **Application Review**: Streamlined process for reviewing and evaluating scholarship applications
- **Applicant Management**: Tools to track and communicate with applicants
- **Analytics**: Insights on scholarship impact and applicant demographics

### For Donors
- **Donation Portal**: Secure payment processing for one-time or recurring donations
- **Impact Tracking**: Visibility into how donations are making a difference
- **Tax Documentation**: Automated receipts for tax purposes

### Platform-Wide
- **User Authentication & Role-Based Access**: Secure login system with role-based redirections
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Accessibility Compliance**: WCAG 2.1 AA standards for inclusive user experience
- **Multi-language Support**: Internationalization framework for future language expansion

## Tech Stack

### Frontend Core
- **Framework**: React.js 18
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for utility-first styling approach
- **State Management**: React Context API for global state management
- **Routing**: React Router v6 for declarative routing

### Authentication & Security
- **Authentication Provider**: Clerk for secure user management
- **Role-Based Access Control**: Custom implementation using Clerk's metadata
- **Form Validation**: Formik with Yup schema validation

### Performance Optimization
- **Code Splitting**: Dynamic imports for route-based code splitting
- **Image Optimization**: Lazy loading and responsive images
- **Caching Strategy**: Local storage for non-sensitive user preferences

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with custom rule configuration
- **Code Formatting**: Prettier
- **Version Control**: Git with conventional commit messages

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akash202004/Edu-Empower.git
   cd Edu-Empower/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=your_backend_api_url
   ```

### Development

To start the development server:
```bash
npm run dev
```

This will launch the application at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production build:
```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

### Linting

To run the linter:
```bash
npm run lint
```

## Project Structure

```
Edu-Empower/Frontend/
├── public/                 # Static assets
│   ├── assets/             # Images, icons, and other media
│   │   ├── screenshots/    # Application screenshots for documentation
│   │   └── icons/          # SVG and other icon formats
│   └── logo.png            # Application logo
├── src/
│   ├── Component/          # UI components organized by feature
│   │   ├── About/          # About section components
│   │   ├── Auth/           # Authentication components
│   │   │   ├── Login.jsx   # Login component
│   │   │   └── RoleSelection.jsx # Role selection after authentication
│   │   ├── CrowdFunding/   # Crowdfunding components
│   │   ├── Donar/          # Donor-related components
│   │   ├── Feature/        # Feature showcase components
│   │   ├── Footer/         # Footer component
│   │   ├── Hero/           # Hero section component
│   │   ├── Layout/         # Layout components
│   │   ├── Navbar/         # Navigation components
│   │   ├── Organization/   # Organization-related components
│   │   │   └── Dashboard/  # Organization dashboard components
│   │   │       ├── OrganizationDashboard.jsx # Main dashboard
│   │   │       └── CreateScholarship.jsx # Scholarship creation form
│   │   ├── Scholarship/    # Scholarship-related components
│   │   │   ├── ScholarshipPage.jsx # Scholarship listing page
│   │   │   ├── ScholarshipDetails.jsx # Individual scholarship view
│   │   │   ├── Scholarshipapply.jsx # Application process
│   │   │   └── ApplicationSuccess.jsx # Success confirmation
│   │   └── Student/        # Student-related components
│   │       ├── StudentDetailsForm.jsx # Student profile form
│   │       └── StudentProfile.jsx # Student profile view
│   ├── hooks/              # Custom React hooks
│   │   └── useSmoothScroll.js # Smooth scrolling functionality
│   ├── services/           # API service integrations
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component with routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Key Components

### Navbar
The navigation bar provides intuitive access to all main sections of the application with responsive design for mobile and desktop. It dynamically adjusts based on user authentication status and role.

**Key Features:**
- Responsive mobile menu with hamburger toggle
- Dynamic navigation links based on user role
- Smooth scrolling to page sections
- User profile dropdown with quick access to account settings

### Hero
The hero section serves as the primary entry point to the platform, featuring a compelling value proposition and clear calls-to-action.

**Key Features:**
- Modern, visually appealing design with background gradient
- Concise tagline: "Innovative Solution for Students"
- Bold heading: "Connecting Students & Support"
- Primary CTA button for immediate user engagement
- Responsive typography that scales across device sizes

### About
The About section highlights the various educational funding options available through the platform, educating users on the breadth of support available.

**Key Features:**
- Comprehensive overview of funding options (scholarships, microloans, grants)
- Visually engaging icons for each funding type
- Clear explanations of how each funding mechanism works
- Call-to-action to begin the user journey

### Feature
The Feature section showcases the platform's unique capabilities that differentiate it from traditional scholarship platforms.

**Key Features:**
- Grid layout of key platform benefits
- Icons and concise descriptions for each feature
- Highlights of personalized recommendations, virtual counseling, career planning tools, and loan forgiveness options
- Responsive design that reorganizes based on screen size

### Footer
The Footer provides essential information and engagement options for users at the end of their browsing session.

**Key Features:**
- Links to peer support, skill-sharing opportunities, and mental health resources
- Email subscription form for platform updates
- Contact information including support email and phone number
- Social media links for community engagement
- Copyright and legal information

### Authentication System
The authentication system leverages Clerk for secure user management with custom role-based redirections.

**Key Features:**
- Secure login with email/password or social providers
- Role selection for new users (Student, Organization, Donor)
- Role-based redirections to appropriate dashboards
- Protected routes requiring authentication
- Session persistence across page refreshes

### Scholarship System
The scholarship system provides end-to-end functionality from discovery to application and status tracking.

**Key Features:**
- Searchable scholarship listings with filtering options
- Detailed scholarship information pages
- Eligibility checking before application
- Multi-step application process with document uploads
- Application status tracking and notifications

### Organization Dashboard
The organization dashboard provides tools for scholarship providers to manage their offerings and applicants.

**Key Features:**
- Overview of active scholarships and application statistics
- Scholarship creation wizard with customizable criteria
- Applicant review interface with sorting and filtering
- Communication tools for contacting applicants
- Analytics on scholarship performance and impact

## Authentication Flow

Edu-Empower implements a comprehensive authentication flow using Clerk:

1. **Initial Access**: Users arrive at the homepage and can browse basic information
2. **Authentication**: Users sign in via the login page using email/password or social providers
3. **Role Selection**: New users select their role (Student, Organization, Donor)
4. **Role Storage**: The selected role is stored in Clerk's user metadata
5. **Redirection**: Users are redirected to role-appropriate dashboards:
   - Students → Student profile completion or dashboard
   - Organizations → Organization dashboard
   - Donors → Donation portal
6. **Protected Routes**: Certain routes require authentication, handled by the `RequireAuth` component
7. **Session Persistence**: Authentication state persists across page refreshes
8. **Sign Out**: Users can sign out from any page via the navbar dropdown

## API Integration

The frontend integrates with the backend API for data operations:

1. **Authentication Token**: Clerk provides JWT tokens for API authentication
2. **API Service Layer**: Centralized service modules handle API communication
3. **Error Handling**: Comprehensive error handling with user-friendly messages
4. **Loading States**: Visual indicators during API operations
5. **Data Caching**: Strategic caching of non-sensitive data for performance

## Deployment

### Prerequisites for Deployment
- A web server or hosting service (Vercel, Netlify, AWS, etc.)
- Environment variables configured for production
- Domain name (optional but recommended)

### Deployment Steps

#### For Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Set the build command to `npm run build`
4. Set the output directory to `dist`
5. Deploy the application

#### For Manual Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist/` directory to your hosting service
3. Configure your web server to handle client-side routing:

   For Nginx:
   ```
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

   For Apache (.htaccess):
   ```
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

## Performance Optimization

Edu-Empower implements several performance optimization strategies:

1. **Code Splitting**: Route-based code splitting to reduce initial load time
2. **Lazy Loading**: Components and images are loaded only when needed
3. **Memoization**: React.memo and useMemo for expensive computations
4. **Bundle Analysis**: Regular analysis of bundle size to identify optimization opportunities
5. **Image Optimization**: Proper sizing and format selection for images
6. **CSS Optimization**: Tailwind's purge feature to remove unused styles
7. **Caching Strategy**: Appropriate cache headers for static assets

## Testing

### Unit Testing
- Component testing with React Testing Library
- Hook testing with custom test utilities
- Service module testing with mock API responses

### Integration Testing
- User flow testing across multiple components
- Form submission and validation testing
- Authentication flow testing

### End-to-End Testing
- Critical user journeys tested with Cypress
- Cross-browser compatibility testing

### Accessibility Testing
- WCAG 2.1 AA compliance testing
- Screen reader compatibility testing
- Keyboard navigation testing

## Contributing

We welcome contributions to Edu-Empower! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and naming conventions
- Write tests for new features
- Update documentation for any changed functionality
- Ensure all tests pass before submitting a pull request
- Reference relevant issues in pull request descriptions

## Troubleshooting

### Common Issues

#### "Cannot find module" errors
```
npm clean-install
```

#### Clerk authentication issues
- Verify that your Clerk publishable key is correctly set in the .env file
- Ensure you have the correct permissions set in your Clerk dashboard

#### Routing issues in production
- Verify that your server is configured to handle client-side routing
- Check that all routes in the application are correctly defined

#### API connection issues
- Confirm that the backend API is running and accessible
- Verify that CORS is properly configured on the backend
- Check that the API base URL is correctly set in the .env file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by the Edu-Empower Team
</p>
```

This enhanced README provides much more detailed information about your Edu-Empower frontend project, including:

1. More comprehensive feature descriptions organized by user type
2. Detailed component explanations with key features
3. In-depth authentication flow explanation
4. API integration details
5. Expanded deployment instructions
6. Performance optimization strategies
7. Testing approach
8. Detailed troubleshooting section
9. More structured project structure documentation

