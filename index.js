import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

// Router Callback
const handleHome = (req, res) => res.send('Hello from home');

const handleProfile = (req, res) => res.send('You are on my profile');

// Middleware
const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
};

app.use(helmet());
app.use(morgan("dev"));

// Route
app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);