import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import TodoItem from './components/TodoItem';
import Home from './components/pages/Home';
import Folder from './components/pages/Folder';
import EditTask from './components/pages/EditTask';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/folder/:idFolder" element={<Folder/>} />
          <Route path="/folder/edit-task/:idFolder/:idTask/:description" element={<EditTask/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
