// utils.js
export const formatCategoryPath = (path) => {
    // This function takes a string and formats it into a URL-friendly path
    // by converting it to lowercase and replacing spaces with hyphens.
    return path.toLowerCase().replace(/\s+/g, '-');
};