import { Link } from 'react-router-dom';

function Navigation() {
    return( 
        <div>
            <p>~<Link to="/">Home</Link>
             ~
            <Link to="/add-exercise">Add</Link>
            ~
            </p>
        </div>
    )
}

export default Navigation