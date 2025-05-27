const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

const app = express();
app.use(express.json());

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

// MongoDB connection using ENV variables
const dbUser = process.env.MONGO_USER;
const dbPass = process.env.MONGO_PASSWORD;
const dbHost = process.env.MONGO_HOST;
const dbPort = process.env.MONGO_PORT || '27017';
const dbName = process.env.MONGO_DB;

const mongoURI = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully!'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// Mongoose Schema
const CalcSchema = new mongoose.Schema({
    num1: Number,
    num2: Number,
    operation: String,
    result: Number
});

const Calculation = mongoose.model('Calculation', CalcSchema);

// CRUD Route: Create Calculation
app.post('/calculate', async (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch (operation) {
        case 'add': result = num1 + num2; break;
        case 'sub': result = num1 - num2; break;
        case 'mul': result = num1 * num2; break;
        case 'div':
            if (num2 === 0) return res.status(400).json({ error: "Cannot divide by zero" });
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    const calc = new Calculation({ num1, num2, operation, result });
    await calc.save();

    logger.info(`Saved calculation: ${num1} ${operation} ${num2} = ${result}`);
    res.status(201).json({ result, id: calc._id });
});

// CRUD Route: Read all calculations
app.get('/calculations', async (req, res) => {
    const all = await Calculation.find();
    res.json(all);
});

// CRUD Route: Update a calculation
app.put('/calculations/:id', async (req, res) => {
    const { id } = req.params;
    const updated = await Calculation.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
});

// CRUD Route: Delete a calculation
app.delete('/calculations/:id', async (req, res) => {
    const { id } = req.params;
    await Calculation.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
});

// Logging incoming requests
app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    next();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`);
});
