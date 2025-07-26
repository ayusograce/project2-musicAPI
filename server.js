const express = require('express');
const connectDB = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
// app.use(bodyParser.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/', require('./routes'));
app
   .use(bodyParser.json())
   .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
   })) 
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        next();
    })
    .use(cors({methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS"}))
    .use(cors({origin: "*"}))
    .use("/", require('./routes'))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, 
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => { res.send(req.session.user !== undefined ? `Welcome ${req.session.user.displayName}` : "Logged out" )}); 
app.get("/github/callback", passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});


// Connect to the database
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });


// Connect to MongoDB
// mongodb.initDb((err) => {
//   if (err) {
//     console.log('Database connection failed:', err);
//   } else {
//     app.listen(port, () => {console.log(`Server is running at http://localhost:${port}`);});
//     console.log('Database connection established successfully');
//   }
// });

// Export the app for testing purposes
module.exports = app;
// To run the server, use the command: npm start
// For development, use: npm run start-dev
// To install dependencies, run: npm install        
// To initialize the project, run: npm init -y