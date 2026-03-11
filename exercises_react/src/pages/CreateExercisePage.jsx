import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateExercisePage() {
    // for creating a new document for the db
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    // behavior after submission
    const newExercise = async (e) => {
        e.preventDefault();
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
            }
        )
        if (response.status === 201) {
            alert(`You've added ${name}. You did ${weight} ${unit} for ${reps} reps on ${date}. Very KK Cool of you.`);
        } else {
            alert("Failed to add exercise, status code = " + response.status)
        }
        navigate('/')
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    }

    return (
        <>
            <h1>KK's Exercise Tracker</h1>
            <p>
                Record your work out while listening to KK Slider Tunes.
            </p>
            <form>
                <fieldset>
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
                </fieldset>
                <button onClick={newExercise}>Add Your KK Exercise</button>
            </form>
        </>
    );
}
export default CreateExercisePage