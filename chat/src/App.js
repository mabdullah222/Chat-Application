import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
