import ExRow from './ExRow.jsx';

function ExTable({ exercises, onDelete, handleEdit }) {

    
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <ExRow exercise={exercise} key={i} onDelete={onDelete} handleEdit={handleEdit} />)}
            </tbody>
            </table>
        </>
    )
}

export default ExTable