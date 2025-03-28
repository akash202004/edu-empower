/**
 * Adds IDs to section elements for smooth scrolling
 * @param {string} prefix - Prefix for the ID
 * @param {Array} sections - Array of section names
 * @returns {Object} - Object with section IDs
 */
export const generateSectionIds = (prefix, sections) => {
  return sections.reduce((acc, section) => {
    acc[section] = `${prefix}-${section.toLowerCase().replace(/\s+/g, '-')}`;
    return acc;
  }, {});
};

/**
 * Creates a scroll navigation item
 * @param {string} id - Section ID
 * @param {string} label - Display label
 * @param {Function} scrollFn - Scroll function
 * @returns {Object} - Navigation item
 */
export const createNavItem = (id, label, scrollFn) => {
  return {
    id,
    label,
    onClick: () => scrollFn(id)
  };
};