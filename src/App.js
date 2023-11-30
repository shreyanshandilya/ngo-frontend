import { BrowserRouter, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useLogout } from './hooks/useLogout'
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Intermediate from './pages/Intermediate';
import AgentIntermediate from './pages/Agent/AgentIntermediate';
import AgentSignup from './pages/Agent/AgentSignup';
import AgentLogin from './pages/Agent/AgentLogin';
import AgentProfile from './pages/Agent/AgentProfile';
import View from './pages/Show';
import Profile from './pages/Profile';
import DonationPage from './pages/DonationPage';
import Show1 from './pages/Show1';

function App() {
  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages1">
          {/* <div>
            <button onClick={handleClick}>Log out</button>
          </div> */}
          {/* <Navbar /> */}
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
              path="/agent"
              element={<AgentIntermediate />}
            />
            <Route
              path="/agent/signup"
              element={<AgentSignup />}
            />
            <Route
              path="/agent/login"
              element={<AgentLogin />}
            />
            <Route
              path="/agent/profile"
              element={<AgentProfile />}
            />
            <Route
              path="/view"
              element={<View />}
            />
            <Route 
              path="/profile" 
              element={<Profile />} 
            />
            <Route
              path="/donate_product"
              element={<DonationPage />}
            />
            <Route
              path="/view/:formId"
              element={<Show1 />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
