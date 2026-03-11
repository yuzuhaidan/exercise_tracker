/**
  Josephine Lyou
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

// Create using POST /exercises

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.post('/exercises', asyncHandler(async (req, res) => {
    const validKeys = ['name', 'reps', 'weight', 'unit', 'date'];
    /** create an array with all given keys.
    if not exactly 5 or one doesn't match, fail */ 
    const givenKeys = Object.keys(req.body)
    // write for loop to check keys
    for (const keys of validKeys) {
        if (!givenKeys.includes(keys)) {
            res.status(400).json({"Error": "Invalid request"});
            return;
        }
    }
    if (givenKeys.length !== 5) {
        res.status(400).json({"Error": "Invalid request"});
        return;
    }
    // name/reps/weight/unit/date validation
    // type check first, then value check
    if (typeof(req.body.reps) !== "number" || typeof(req.body.weight) !== "number") {
        res.status(400).json({"Error": "Invalid request"});
        return;
    }

    if (req.body.name === '' || req.body.name === null || 
            req.body.reps <= 0 ||
            req.body.weight <= 0 || 
            !req.body.unit === 'kgs' || !req.body.unit === 'lbs' ||
            isDateValid(req.body.date) === false) {
        res.status(400).json({"Error": "Invalid request"});
        return;
    }
    
    const exercise = await exercises.createExercise(req.body.name,
                                        req.body.reps,
                                        req.body.weight,
                                        req.body.unit,
                                        req.body.date);
    res.status(201).json(exercise);
}));

// Read using GET /exercises
app.get('/exercises', asyncHandler(async (req, res) => {
    const exerciseInfo = await exercises.findExerciseInfo(req.query);
    res.status(200).json(exerciseInfo);
}))

// GET using GET /exercises/:_id
app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.findById(req.params._id);
    if (exercise === null) {
        res.status(404).json({"Error": "Not found"});
    } else {
        res.status(200).json(exercise);
    }    
}));

// Update using PUT /exercises/:_id
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    /** name/reps/weight/unit/date validation
    type check first, then value check */
    if (typeof(req.body.reps) !== "number" || typeof(req.body.weight) !== "number") {
        res.status(400).json({"Error": "Invalid request"});
        return;
    }

    if (req.body.name === '' || req.body.name === null || 
            req.body.reps <= 0 ||
            req.body.weight <= 0 || 
            !req.body.unit === 'kgs' || !req.body.unit === 'lbs' ||
            isDateValid(req.body.date) === false) {
        res.status(400).json({"Error": "Invalid request"});
        return;
    }

    // after validation
    const user = await exercises.updateById(req.params._id, req.body);
    if (user === null) {
        res.status(404).json({"Error": "Not found"});
    } else {
        res.status(200).json(user);
    }
}));

// DELETE using DELETE /exercises/:_id
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const result = await exercises.deleteById(req.params._id);
    if (result === 1) {
        res.status(204).json();
    } else {
        res.status(404).json({"Error": "Not found"});
    }
}));
