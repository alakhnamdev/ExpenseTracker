const config = {
    app_name: "Expense Tracker Backend",
    app_description: "A robust and scalable backend service. Created By - Alakh Namdev",
    debug: process.env.NODE_ENV !== 'production',
    allowed_origins: `${process.env.ALLOWED_ORIGINS}` // Allow specific origin for CORS
};

module.exports = config;