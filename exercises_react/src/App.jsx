import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import Navigation from './components/Navigation.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';

function App() {
  // const [count, setCount] = useState(0)

  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={ <HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
          <Route path="/create" element={<CreateExercisePage />}></Route>
          <Route path="/add-exercise" element={<CreateExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
