const { Sequelize } = require("sequelize");
const retry = require('retry');

// https://auth-db878.hstgr.io/index.php?db=u399823435_uc_chat

const sequelize = new Sequelize(
    process.env.DEVELOPMENT_DB_NAME,
    process.env.DEVELOPMENT_DB_USERNAME,
    process.env.DEVELOPMENT_DB_PASSWORD, {
    host: process.env.DEVELOPMENT_DB_HOST,
    dialect: 'mysql',
    timezone: '+00:00',// Set the default timezone to UTC
    // timezone: '-06:00', // Set the default timezone to MST
    // timezone: '-07:00', // Set the default timezone to PST
    // timezone: '-04:00', // Set the default timezone to EST
    // timezone: '-05:00', // Set the default timezone to CST
    // timezone: '-9:00', // Set the default timezone to HST
    // timezone: '-08:00', // Set the default timezone to AKST
    // timezone: '+06:30', // Set the default timezone to IST
    dialectOptions: {
        connectTimeout: 300000, // 30 seconds
    },
});

// Create a function to establish the database connection with retries
function connectWithRetry() {
    const operation = retry.operation({
        retries: 5, // Maximum number of retry attempts
        factor: 2, // Exponential backoff factor
        minTimeout: 1000, // Minimum delay between retries (in milliseconds)
    });

    operation.attempt(function (currentAttempt) {
        console.log(`Attempting database connection (attempt ${currentAttempt})`);

        sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');

                // return sequelize.sync({ alter: true }); // or use { force: true } in development
            })
            .then(() => {
                // console.log("✅ All models synced with the database.");
            })
            .catch((error) => {
                if (operation.retry(error)) {
                    return;
                }

                console.error('Unable to connect to the database:', error);
            });
    });
}

// Invoke the connectWithRetry function to initiate the connection
connectWithRetry();

module.exports = sequelize