// Get base URL for assets
export const getBaseUrl = () => {
    return import.meta.env.BASE_URL;
};

// Helper to parse the custom date format from properties.json
export const parsePropertyDate = (dateObj) => {
    const months = {
        "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
        "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
    // Return a standard JS Date object
    return new Date(dateObj.year, months[dateObj.month], dateObj.day);
};