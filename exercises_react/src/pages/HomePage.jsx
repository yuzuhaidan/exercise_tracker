import ExTable from '../components/ExTable.jsx'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 


function HomePage( { setExerciseToEdit  }) {
    // populate the table with db 
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    useEffect(() => {
        loadExercises(); 
    }, []);

    // for deleting
    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercise = await getResponse.json();
            setExercises(exercises.filter( e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    };

    // for editing
    const handleEdit = (exercise) => {
        setExerciseToEdit(exercise)
        navigate(`/edit-exercise`);
    };

    return (
        <>
            <h2>
                KK's Exercise Tracker
            </h2>
            <p>
                Record your work out while listening to KK Slider Tunes.
            </p>
            {/* Load the table showing existing work out history from db */}
            <div>
            <a href="/create">Add a KK Exercise</a>
            <ExTable exercises={exercises} onDelete={onDelete} handleEdit={handleEdit}/>
            </div>
        </>
    )

}

export default HomePage