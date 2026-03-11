import { MdEditSquare, MdDelete } from "react-icons/md";

function ExRow( { exercise, onDelete, handleEdit } ) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><button onClick={e => {e.preventDefault(); handleEdit(exercise)}}>
                <MdEditSquare /></button></td>
            <td><button onClick={e => {e.preventDefault(); onDelete(exercise._id)}}>
                <MdDelete />
                </button></td>
        </tr>
    )

}

export default ExRow