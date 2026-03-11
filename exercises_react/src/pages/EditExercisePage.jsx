import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function EditExercisePage( { exerciseToEdit } ) {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const navigate = useNavigate();

    const editExercise = async (e) => {
        e.preventDefault();
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedExercise)
            }
        )
        if (response.status === 200) {
            alert(`You've edited ${name}. You did ${weight} ${unit} for ${reps} reps on ${date}. Very KK Cute of you.`);
        } else {
            alert("Failed to edit exercise, status code = " + response.status)
        }
        navigate('/')
    };

    return (
        <>
        <h2>
            KK's Exercise Tracker
        </h2>
        <p>
            Record your work out while listening to KK Slider Tunes.
        </p>

        <legend>Enter Your KK Exercise Details</legend>
        <label>Name
            <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)} />
        </label>
        <label>Reps 
            <input 
                type="number" 
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
        </label>
        <label>Weight 
            <input 
                type="number" 
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
        </label>
        <label htmlFor="unit">Unit
            <select id="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
        </label>
        <label>Date
            <input 
                type="text" 
                value={date}
                onChange={e => setDate(e.target.value)} />
        </label>

        <button onClick={editExercise}>Edit Your KK Exercise</button>
        </>
    )
}

export default EditExercisePage