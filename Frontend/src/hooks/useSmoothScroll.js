import { useEffect } from 'react';

/**
 * A custom hook that enables smooth scrolling behavior for the entire website
 * @param {number} offset - Optional offset from the top (useful for fixed headers)
 */
const useSmoothScroll = (offset = 80) => {
  useEffect(() => {
    // Save the original behavior
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;
    
    // Set smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle all anchor links for smooth scrolling
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      
      if (!target) return;
      
      const href = target.getAttribute('href');
      
      // Only process internal anchor links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Add event listener to the document
    document.addEventListener('click', handleLinkClick);
    
    // Cleanup function
    return () => {
      // Restore original scroll behavior
      document.documentElement.style.scrollBehavior = originalStyle;
      document.removeEventListener('click', handleLinkClick);
    };
  }, [offset]);
  
  // Function to scroll to a specific element
  const scrollToElement = (elementRef) => {
    if (elementRef && elementRef.current) {
      const yOffset = -offset;
      const element = elementRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  
  // Function to scroll to a specific element by ID
  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -offset;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  
  return { scrollToElement, scrollToId };
};

export default useSmoothScroll;