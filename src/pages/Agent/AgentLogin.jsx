import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import axios from "axios"
import '../Login'
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/NavbarLogged'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(0)
  const [err, setError] = useState(0)
  const [Success, setSuccess] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(0)
    setLoading(1)
    let data = {
      username: username,
      password: password
    }
    await fetch(`${process.env.REACT_APP_BASE_URL}/agent/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          setLoading(0);
          localStorage.setItem("token", json.token)
          localStorage.setItem("role", json.role)
          setSuccess(1)
          navigate("/agent/profile")
        }
        else {
          setLoading(0);
          setError(1);
        }
      });
  }

  return (<>
    <Navbar />
    <div className="container">
      <form className="login" onSubmit={handleSubmit}>
        <h2><strong>Log In as Agent</strong></h2>
        <div className="form_input">
          <label htmlFor="username">Username :</label>
          <input
            name="username"
            id="username"
            type="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form_input">
          <label htmlFor="password">Password :</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={handleSubmit}>Log in</button>
        {loading ? <div>Logging in.. Please wait</div> : <></>}
        {err ? <div className="error">Please recheck your Username</div> : <></>}
        {Success ? <div>Success</div> : <></>}
      </form>
    </div>
  </>
  )
}

export default Login;