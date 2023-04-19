// Import dependencies
import dotenv from 'dotenv'; // For loading environment variables from .env file
dotenv.config();
import express from 'express'; // Express for building web server
import exphbs from 'express-handlebars'; // Handlebars for rendering views
import routes from './routes/routes.js'; // Custom routes for handling HTTP requests
import db from './models/db.js'; // Custom module for connecting to database
const app = express(); // Create Express app
const PORT = 3000; // Set port to listen on, fallback to 3000 if not specified
import session from 'express-session'; // Middleware for managing sessions
import MongoStore from 'connect-mongo'; // Store session data in MongoDB

// Set view engine and handlebars as the template engine
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({extname: 'hbs'}));

// Middleware for parsing URL-encoded requests
app.use(express.urlencoded({extended: true}));

// Serve static files from public directory
app.use(express.static('public'));


// Set up session middleware with MongoStore
app.use(session({
    secret: 'archersbowlsecret', // Secret key used for session data encryption
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ccapdev-mp'}), // Store session data in MongoDB, fallback to local MongoDB URI if not specified in environment variables
    resave: false, // Do not save session if it hasn't been modified
    saveUninitialized: true, // Save uninitialized session (e.g. new session without modifications)
    cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24 * 7} // Cookie configuration (not secure for development, max age set to 21 days)
}));
app.use(express.json());

// Use custom routes
app.use('/', routes);


// Connect to database
db.connect();

// Start server and listen to specified port
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
