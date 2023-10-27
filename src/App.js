import { BrowserRouter, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useLogout } from './hooks/useLogout'
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Intermediate from './pages/Intermediate';
import View from './pages/Show';

function App() {
  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
        {/* <div>
            <button onClick={handleClick}>Log out</button>
          </div> */}
          <Navbar/>
          <Routes>
            <Route 
              path="/"
              element={<Landing />}
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
            <Route 
              path="/donate" 
              element={<Intermediate />} 
            />
            <Route 
              path="/view" 
              element={<View />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
