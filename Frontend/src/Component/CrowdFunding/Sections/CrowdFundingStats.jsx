import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { FiUsers, FiDollarSign, FiAward, FiGlobe } from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CrowdFundingStats = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

  const stats = [
    {
      icon: <FiDollarSign className="h-8 w-8 text-indigo-600" />,
      value: 1250000,
      label: "Funds Raised",
      prefix: "$",
    },
    {
      icon: <FiUsers className="h-8 w-8 text-indigo-600" />,
      value: 5000,
      label: "Students Supported",
    },
    {
      icon: <FiAward className="h-8 w-8 text-indigo-600" />,
      value: 350,
      label: "Successful Campaigns",
    },
    {
      icon: <FiGlobe className="h-8 w-8 text-indigo-600" />,
      value: 25,
      label: "Countries Reached",
    },
  ];

  return (
    <section className="py-16">
      <motion.div 
        ref={statsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 relative inline-block">
          Our Impact
          <motion.div 
            className="absolute -bottom-2 left-0 w-full h-1 bg-black"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Together we're making education accessible for everyone
        </p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            className="bg-white p-6 rounded-2xl text-center border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex justify-center mb-4">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold mb-2 text-gray-900">
              {isInView && (
                <>
                  {stat.prefix || ""}
                  <CountUp end={stat.value} separator="," duration={2.5} />
                </>
              )}
            </h3>
            <p className="text-gray-700">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CrowdFundingStats;