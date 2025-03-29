import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Import components
import OrganizationHero from './OrganizationHero';
import ProcessSteps from './ProcessSteps';
import OrganizationFeatures from './OrganizationFeatures';
import OrganizationFAQ from './OrganizationFAQ';
import ImpactMetrics from './ImpactMetrics';

// Import data
import { 
  features as allFeatures, 
  testimonials, 
  impactMetrics, 
  processSteps
} from './OrganizationData';

// Online image URLs
const IMAGES = {
  dashboardImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  testimonialImg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  testimonialAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  tataTrustLogo: "https://www.tata.com/content/dam/tata/images/about-us/desktop/logo-tata-trusts.svg",
  tataTrust: "https://www.tata.com/content/dam/tata/images/about-us/desktop/logo-tata.svg",
  relianceFoundation: "https://www.reliancefoundation.org/sites/all/themes/reliancefoundation/images/logo.png",
  infosysFoundation: "https://www.infosys.com/content/dam/infosys-web/en/global-resource/logos/infosys-logo.svg",
  azimPremji: "https://azimpremjifoundation.org/sites/default/files/APF-logo.png"
};

const Organization = () => {
  console.log("Rendering Organization component");
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);
  const pageRef = useRef(null);
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });
  
  // Use the first 3 features from the imported data
  const displayFeatures = allFeatures.slice(0, 3);
  
  // Update this function to remove scholarshipcreateform navigation
  const handleUserSync = () => {

    console.log("Organization action triggered");
  };
  
  // Handle image errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '';
  };
  
  // FAQ data
  const faqData = [
    {
      question: "How do I create a scholarship program?",
      answer: "Creating a scholarship program is simple. Sign in to your account, click on 'Create Your Scholarship' button, and follow the guided process. You'll be able to set eligibility criteria, funding amount, and application deadlines."
    },
    {
      question: "What fees does Edu-Empower charge?",
      answer: "Edu-Empower charges a nominal 2% platform fee on funds disbursed through scholarships. This helps us maintain the platform, verify student credentials, and provide impact reporting tools."
    },
    {
      question: "How are students verified?",
      answer: "We have a rigorous verification process that includes document validation, academic record verification, and income assessment. This ensures that scholarships reach the most deserving candidates."
    },
    {
      question: "Can I track the impact of my scholarship?",
      answer: "Yes, our platform provides comprehensive impact tracking tools. You can monitor student progress, view academic achievements, and generate detailed reports on how your scholarship is making a difference."
    },
    {
      question: "How long does the scholarship creation process take?",
      answer: "The basic scholarship setup takes just 15 minutes. Once created, our team reviews the details within 24-48 hours before making it live for student applications."
    }
  ];
  
  // Check if stats section is in view for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  // Sample scholarship programs
  const scholarshipPrograms = [
    {
      title: "Merit Scholarship",
      amount: "₹50,000",
      recipients: 25,
      deadline: "August 15, 2023"
    },
    {
      title: "STEM Excellence Award",
      amount: "₹75,000",
      recipients: 10,
      deadline: "September 30, 2023"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col relative" ref={pageRef}>
      <Navbar />
      
      {/* Hero Section */}
      <OrganizationHero 
        handleUserSync={handleUserSync}
        handleImageError={handleImageError}
        IMAGES={IMAGES}
        scholarshipPrograms={scholarshipPrograms}
      />
      
      {/* Process Steps Section */}
      <ProcessSteps processSteps={processSteps} />
      
      {/* Features Section */}
      <OrganizationFeatures displayFeatures={displayFeatures} />
      
      {/* Testimonial Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-indigo-600">
                <img 
                  src={IMAGES.testimonialImg} 
                  alt="Organization Testimonial" 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="md:w-3/5 p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <img 
                    src={IMAGES.tataTrustLogo} 
                    alt={testimonials[0].company} 
                    className="h-10 mr-4"
                    onError={handleImageError}
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonials[0].company}</div>
                    <div className="text-sm text-gray-600">Education Initiative</div>
                  </div>
                </div>
                
                <blockquote className="text-xl italic text-gray-700 mb-6">
                  "{testimonials[0].quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <img 
                    src={IMAGES.testimonialAvatar} 
                    alt={testimonials[0].name} 
                    className="w-12 h-12 rounded-full mr-4"
                    onError={handleImageError}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonials[0].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[0].position}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Impact Metrics Section */}
      <div ref={statsRef}>
        <ImpactMetrics impactMetrics={impactMetrics} statsInView={statsInView} />
      </div>
      
      {/* FAQ Section */}
      <OrganizationFAQ faqData={faqData} />
      
      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-indigo-700 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-xl mx-auto">
              Join hundreds of organizations that are transforming lives through education. Create your first scholarship program today.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all duration-200"
              onClick={handleUserSync}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Organization;