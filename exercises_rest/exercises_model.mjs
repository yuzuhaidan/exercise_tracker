/**
  Josephine Lyou
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/** define the schema for the exercises collection where each doc must have:
 name, reps, weight, unit, date, _id */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/** compile the model from the schema. */
const Exercise = mongoose.model(EXERCISE_DB_NAME, exerciseSchema);

/** create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save */
const createExercise = async (name, reps, weight, unit, date) => {
    // call the constructor to create an instance of exercise_db
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // call the save method to persist this obj as a doc in MongoDB
    return exercise.save();
}

// query exercise info
const findExerciseInfo = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

// query for user info by USER ID
const findById = async (id) => {
    const query = Exercise.findById(id);
    return query.exec();
}

// update info by ID
async function updateById(id, query) {
    const result = await Exercise.findByIdAndUpdate(id, query, { new: true });
    return result;
}

// delete by ID
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

export { connect, createExercise, findExerciseInfo, findById, updateById, deleteById };