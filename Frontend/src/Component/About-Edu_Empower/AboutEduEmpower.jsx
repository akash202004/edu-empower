import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FiTarget, FiHeart, FiTrendingUp, FiUsers, FiBookOpen, FiAward, FiCheck, FiArrowRight, FiDollarSign, FiGlobe } from 'react-icons/fi';
import CountUp from 'react-countup';
import Layout from '../Layout/Layout';

// Import all section components
import AboutHero from './AboutHero';
import MissionSection from './MissionSection';
import VisionSection from './VisionSection';
import HistorySection from './HistorySection';
import ImpactSection from './ImpactSection';
import TeamSection from './TeamSection';
import PartnersSection from './PartnersSection';
import FaqSection from './FaqSection';
import CallToAction from './CallToAction';
import ValuesSection from './ValuesSection';
import GlobalReachSection from './GlobalReachSection';

const AboutEduEmpower = () => {
  // Refs for scroll animations
  const aboutRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const historyRef = useRef(null);
  const impactRef = useRef(null);
  const teamRef = useRef(null);
  const partnersRef = useRef(null);
  const faqRef = useRef(null);
  
  // InView states for each section
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const isHistoryInView = useInView(historyRef, { once: true, amount: 0.3 });
  const isImpactInView = useInView(impactRef, { once: true, amount: 0.3 });
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const isPartnersInView = useInView(partnersRef, { once: true, amount: 0.3 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.3 });
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);

  // Team members data
  const teamMembers = [
    {
      name: "Aisha Patel",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      description: "Former education policy advisor with a passion for making education accessible to all."
    },
    {
      name: "Raj Sharma",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description: "Tech innovator with 15+ years experience building platforms that connect people with opportunities."
    },
    {
      name: "Priya Mehta",
      role: "Head of Partnerships",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      description: "Former NGO director who has established partnerships with over 200 educational institutions."
    },
    {
      name: "Vikram Singh",
      role: "Financial Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      description: "Financial expert with experience in both corporate and non-profit sectors, ensuring transparency and impact."
    }
  ];

  // Impact stats
  const impactStats = [
    { value: 12000, label: "Students Supported", icon: <FiUsers className="h-6 w-6" /> },
    { value: 5, label: "Million Dollars Raised", icon: <FiDollarSign className="h-6 w-6" /> },
    { value: 250, label: "Partner Institutions", icon: <FiBookOpen className="h-6 w-6" /> },
    { value: 92, label: "Success Rate (%)", icon: <FiAward className="h-6 w-6" /> }
  ];

  // Partner organizations
  const partners = [
    { name: "Tata Trusts", logo: "https://www.tata.com/content/dam/tata/images/about-us/desktop/logo-tata-trusts.svg" },
    { name: "Reliance Foundation", logo: "https://www.reliancefoundation.org/sites/all/themes/reliancefoundation/images/logo.png" },
    { name: "Infosys Foundation", logo: "https://www.infosys.com/content/dam/infosys-web/en/global-resource/logos/infosys-logo.svg" },
    { name: "Azim Premji Foundation", logo: "https://azimpremjifoundation.org/sites/default/files/APF-logo.png" },
    { name: "Bill & Melinda Gates Foundation", logo: "https://www.gatesfoundation.org/-/media/gfo/4-about-us/press-room/bmgf-logo-black.svg" },
    { name: "UNESCO", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/UNESCO_logo.svg/2560px-UNESCO_logo.svg.png" }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "What is Edu-Empower's mission?",
      answer: "Edu-Empower's mission is to democratize access to education by connecting students with financial resources, scholarships, and a supportive community. We believe that financial constraints should never be a barrier to quality education."
    },
    {
      question: "How does Edu-Empower help students?",
      answer: "We help students through multiple channels: matching them with relevant scholarships, facilitating crowdfunding campaigns for their education, connecting them with mentors, and providing resources for academic and career development."
    },
    {
      question: "Who can apply for scholarships on Edu-Empower?",
      answer: "Any student with a verified academic record can apply for scholarships on our platform. We have opportunities for students at various levels - from high school to postgraduate studies - and across different fields of study."
    },
    {
      question: "How does Edu-Empower verify scholarship providers?",
      answer: "We have a rigorous verification process for all organizations offering scholarships on our platform. This includes checking their legal status, financial stability, past scholarship disbursement records, and conducting interviews with their representatives."
    },
    {
      question: "Can I donate to support students on Edu-Empower?",
      answer: "Absolutely! You can donate to specific student campaigns, contribute to our general scholarship fund, or even establish your own scholarship program through our platform. Every contribution, regardless of size, makes a difference."
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      year: "2018",
      title: "Foundation",
      description: "Edu-Empower was founded with a vision to democratize access to education through technology."
    },
    {
      year: "2019",
      title: "First Partnerships",
      description: "Established partnerships with 50 educational institutions and launched our scholarship matching platform."
    },
    {
      year: "2020",
      title: "Crowdfunding Launch",
      description: "Introduced our crowdfunding feature, enabling students to raise funds directly from supporters."
    },
    {
      year: "2021",
      title: "Mentorship Program",
      description: "Launched our mentorship program connecting students with industry professionals and academics."
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Expanded operations to support students across South Asia with localized scholarship opportunities."
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Implemented AI-powered matching algorithms to better connect students with relevant opportunities."
    }
  ];

  return (
    <div ref={aboutRef} className="relative bg-white">
      {/* Hero Section */}
      <AboutHero scrollY={y} opacity={opacity} />

      {/* Mission Section */}
      <div ref={missionRef}>
        <MissionSection isMissionInView={isMissionInView} />
      </div>

      {/* Vision Section */}
      <div ref={visionRef}>
        <VisionSection isVisionInView={isVisionInView} />
      </div>

      {/* History/Timeline Section */}
      <div ref={historyRef}>
        <HistorySection isHistoryInView={isHistoryInView} timelineEvents={timelineEvents} />
      </div>

      {/* Impact Stats Section */}
      <div ref={impactRef}>
        <ImpactSection isImpactInView={isImpactInView} impactStats={impactStats} />
      </div>

      {/* Team Section */}
      <div ref={teamRef}>
        <TeamSection isTeamInView={isTeamInView} teamMembers={teamMembers} />
      </div>

      {/* Partners Section */}
      <div ref={partnersRef}>
        <PartnersSection isPartnersInView={isPartnersInView} partners={partners} />
      </div>

      {/* FAQ Section */}
      <div ref={faqRef}>
        <FaqSection isFaqInView={isFaqInView} faqItems={faqItems} />
      </div>

      {/* Call to Action Section */}
      <CallToAction />

      {/* Values Section */}
      <ValuesSection />

      {/* Global Reach Section */}
      <GlobalReachSection />
    </div>
  );
};

export default AboutEduEmpower;