import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useLogout } from './hooks/useLogout'
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
import Admin from './components/Admin';
import AdminLogin from './components/Admin/Login';
import AdminAgent from './components/Admin/AdminAgent';
import AdminDonor from './components/Admin/AdminDonor';


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
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />
            <Route
              path="/admin/dashboard"
              element={<Admin />}
            />
            <Route
              path="/admin/agent/:id"
              element={<AdminAgent />}
            />
            <Route
              path="/admin/donor/:id"
              element={<AdminDonor />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
