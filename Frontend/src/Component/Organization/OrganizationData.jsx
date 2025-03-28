import { FiAward, FiUsers, FiBookOpen, FiDollarSign, FiHeart, FiCheck, FiArrowRight, FiShield, FiTarget, FiTrendingUp, FiGlobe, FiStar, FiClock, FiBarChart2, FiLayers, FiUserCheck, FiDatabase, FiPieChart, FiSettings, FiZap, FiAperture, FiCompass, FiLifeBuoy, FiMessageCircle } from "react-icons/fi";

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 }
  }
};

// Animation variants
export const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0], 
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  }
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  }
};

export const shimmerAnimation = {
  initial: { backgroundPosition: "0% 50%" },
  animate: { 
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], 
    transition: { 
      duration: 8, 
      repeat: Infinity, 
      ease: "linear" 
    } 
  }
};

// Advanced animations
export const rotateAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360, 
    transition: { 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    } 
  }
};

export const bounceAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -20, 0], 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 10, 
      repeat: Infinity, 
      repeatDelay: 1
    } 
  }
};

export const glowAnimation = {
  initial: { boxShadow: "0 0 0 rgba(79, 70, 229, 0)" },
  animate: { 
    boxShadow: ["0 0 0 rgba(79, 70, 229, 0)", "0 0 20px rgba(79, 70, 229, 0.7)", "0 0 0 rgba(79, 70, 229, 0)"], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    } 
  }
};

// Sample data for features
export const features = [
  {
    icon: FiShield,
    title: "Secure Platform",
    description: "End-to-end encryption and robust security protocols to protect sensitive data.",
    color: "from-blue-400 to-indigo-500"
  },
  {
    icon: FiTarget,
    title: "Targeted Reach",
    description: "Connect with the most deserving students based on customizable criteria.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: FiBarChart2,
    title: "Impact Analytics",
    description: "Comprehensive dashboards and reports to measure your scholarship's impact.",
    color: "from-purple-400 to-indigo-500"
  },
  {
    icon: FiTrendingUp,
    title: "Scalable Solutions",
    description: "Easily scale your scholarship programs from tens to thousands of students.",
    color: "from-orange-400 to-pink-500"
  },
  {
    icon: FiGlobe,
    title: "Nationwide Network",
    description: "Access students from across India through our extensive educational network.",
    color: "from-teal-400 to-cyan-500"
  },
  {
    icon: FiClock,
    title: "Time Efficiency",
    description: "Streamline your scholarship management with our intuitive tools and workflows.",
    color: "from-red-400 to-rose-500"
  },
  {
    icon: FiCheck,
    title: "Compliance Ready",
    description: "Stay compliant with all relevant regulations and reporting requirements.",
    color: "from-amber-400 to-yellow-500"
  },
  {
    icon: FiDatabase,
    title: "Centralized Management",
    description: "Manage all aspects of your scholarship programs from a single dashboard.",
    color: "from-indigo-400 to-blue-500"
  },
  {
    icon: FiUserCheck,
    title: "Verified Applicants",
    description: "All student profiles are verified through our multi-step verification process.",
    color: "from-pink-400 to-rose-500"
  }
];

// Sample data for testimonials
export const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "CSR Director, Tech Innovations Ltd",
    quote: "Edu-Empower has transformed how we manage our scholarship programs. We've been able to reach more deserving students and track our impact more effectively. The platform's analytics tools have given us unprecedented insights into our educational initiatives.",
    image: "/assets/testimonial-1.jpg",
    rating: 5,
    company: "Tech Innovations Ltd",
    logo: "/assets/company-logo-1.png",
    stats: { students: 250, funds: "₹1.2M", retention: "94%" }
  },
  {
    name: "Priya Sharma",
    position: "Foundation Head, Global Education Trust",
    quote: "The platform's analytics and reporting features have given us unprecedented insights into the impact of our educational initiatives. We can now make data-driven decisions about our scholarship allocations and see real-time results of our investments in education.",
    image: "/assets/testimonial-2.jpg",
    rating: 5,
    company: "Global Education Trust",
    logo: "/assets/company-logo-2.png",
    stats: { students: 500, funds: "₹3.5M", retention: "97%" }
  },
  {
    name: "Amit Patel",
    position: "CEO, Future Leaders Foundation",
    quote: "Working with Edu-Empower has allowed us to scale our scholarship program from supporting 50 students to over 500 in just two years. The platform's automated workflows have reduced our administrative burden by 70%, allowing us to focus on what matters most - the students.",
    image: "/assets/testimonial-3.jpg",
    rating: 4,
    company: "Future Leaders Foundation",
    logo: "/assets/company-logo-3.png",
    stats: { students: 500, funds: "₹2.8M", retention: "92%" }
  },
  {
    name: "Sunita Reddy",
    position: "Head of CSR, Horizon Industries",
    quote: "The transparency and accountability that Edu-Empower provides has been invaluable for our CSR reporting. We can clearly demonstrate the impact of our educational initiatives to stakeholders with comprehensive data and success stories.",
    image: "/assets/testimonial-4.jpg",
    rating: 5,
    company: "Horizon Industries",
    logo: "/assets/company-logo-4.png",
    stats: { students: 320, funds: "₹1.8M", retention: "95%" }
  }
];

// Sample data for impact metrics
export const impactMetrics = [
  { value: 500, suffix: "+", label: "Partner Organizations", icon: FiUsers, color: "text-blue-600" },
  { value: 10000, suffix: "+", label: "Students Supported", icon: FiBookOpen, color: "text-green-600" },
  { value: 25, suffix: "M", label: "Scholarship Funds (₹)", icon: FiDollarSign, color: "text-purple-600" },
  { value: 95, suffix: "%", label: "Graduation Rate", icon: FiAward, color: "text-pink-600" }
];

// Sample data for FAQ items
export const faqItems = [
  {
    question: "How does Edu-Empower help organizations manage scholarships?",
    answer: "Our platform provides end-to-end scholarship management tools, including application processing, candidate evaluation, fund disbursement, and impact tracking. We streamline the entire process, saving you time and resources while maximizing your impact."
  },
  {
    question: "What types of organizations can benefit from Edu-Empower?",
    answer: "We work with a wide range of organizations, including corporations (through CSR initiatives), foundations, NGOs, educational institutions, and government bodies. Any organization looking to create or improve scholarship programs can benefit from our platform."
  },
  {
    question: "How secure is the platform for financial transactions?",
    answer: "Edu-Empower uses bank-level security protocols and is compliant with all relevant financial regulations. All transactions are encrypted and processed through trusted payment gateways, ensuring the highest level of security for your funds."
  },
  {
    question: "Can we customize the scholarship application process?",
    answer: "Absolutely! Our platform allows for complete customization of the application process, including custom questions, document requirements, eligibility criteria, and evaluation workflows tailored to your organization's specific needs."
  },
  {
    question: "How does the platform help with impact measurement?",
    answer: "Our comprehensive analytics dashboard provides real-time insights into your scholarship program's impact, including student progress tracking, graduation rates, employment outcomes, and more. We also offer customized impact reports for stakeholders."
  },
  {
    question: "Is there a minimum budget required to use Edu-Empower?",
    answer: "No, we work with organizations of all sizes and budgets. Our flexible pricing model scales with your needs, making it accessible for small foundations as well as large corporate CSR initiatives."
  },
  {
    question: "How do you verify student information?",
    answer: "We employ a multi-step verification process that includes document verification, academic record validation, and institutional partnerships to ensure all student information is accurate and authentic."
  }
];

// Sample data for process steps
export const processSteps = [
  {
    title: "Create Your Account",
    description: "Set up your organization profile with key information about your mission and goals.",
    icon: FiUserCheck,
    color: "bg-blue-500"
  },
  {
    title: "Design Your Scholarship",
    description: "Customize eligibility criteria, application forms, and selection processes.",
    icon: FiSettings,
    color: "bg-purple-500"
  },
  {
    title: "Launch & Promote",
    description: "Publish your scholarship and leverage our network to reach potential applicants.",
    icon: FiZap,
    color: "bg-pink-500"
  },
  {
    title: "Review Applications",
    description: "Use our tools to efficiently evaluate and shortlist qualified candidates.",
    icon: FiLayers,
    color: "bg-orange-500"
  },
  {
    title: "Award & Disburse",
    description: "Select recipients and securely transfer funds through our platform.",
    icon: FiAward,
    color: "bg-green-500"
  },
  {
    title: "Track Impact",
    description: "Monitor student progress and measure the impact of your scholarship program.",
    icon: FiBarChart2,
    color: "bg-teal-500"
  }
];

// Sample data for partner logos
export const partnerLogos = [
  { name: "Tech Innovations Ltd", logo: "/assets/partner-1.png" },
  { name: "Global Education Trust", logo: "/assets/partner-2.png" },
  { name: "Future Leaders Foundation", logo: "/assets/partner-3.png" },
  { name: "Horizon Industries", logo: "/assets/partner-4.png" },
  { name: "Bright Futures Inc", logo: "/assets/partner-5.png" },
  { name: "Education First", logo: "/assets/partner-6.png" },
  { name: "Tomorrow's Leaders", logo: "/assets/partner-7.png" },
  { name: "Knowledge Foundation", logo: "/assets/partner-8.png" }
];

// Sample data for solution tabs
export const solutionTabs = [
  {
    title: "For Corporations",
    icon: FiTarget,
    content: {
      heading: "Maximize Your CSR Impact",
      description: "Our platform helps corporations create meaningful educational initiatives that align with CSR goals while providing detailed impact reporting for stakeholders.",
      features: [
        "Streamlined scholarship management",
        "Comprehensive impact analytics",
        "Customizable branding options",
        "Regulatory compliance reporting",
        "Student progress tracking"
      ],
      image: "/assets/corporate-solution.jpg"
    }
  },
  {
    title: "For Foundations",
    icon: FiHeart,
    content: {
      heading: "Amplify Your Educational Mission",
      description: "Foundations can scale their scholarship programs efficiently while maintaining personalized connections with recipients and measuring outcomes effectively.",
      features: [
        "Scalable application processing",
        "Multi-tier evaluation workflows",
        "Outcome measurement tools",
        "Donor management integration",
        "Student mentorship tracking"
      ],
      image: "/assets/foundation-solution.jpg"
    }
  },
  {
    title: "For Educational Institutions",
    icon: FiBookOpen,
    content: {
      heading: "Streamline Scholarship Administration",
      description: "Educational institutions can centralize scholarship management, reduce administrative burden, and better connect students with funding opportunities.",
      features: [
        "Centralized scholarship database",
        "Automated eligibility matching",
        "Integrated with student information systems",
        "Simplified disbursement processes",
        "Academic performance tracking"
      ],
      image: "/assets/education-solution.jpg"
    }
  },
  {
    title: "For Government Bodies",
    icon: FiShield,
    content: {
      heading: "Transparent & Efficient Public Programs",
      description: "Government agencies can implement transparent, efficient scholarship programs with robust verification and comprehensive reporting capabilities.",
      features: [
        "Advanced verification systems",
        "Transparent selection processes",
        "Geographic distribution analytics",
        "Multi-level approval workflows",
        "Comprehensive audit trails"
      ],
      image: "/assets/government-solution.jpg"
    }
  }
];