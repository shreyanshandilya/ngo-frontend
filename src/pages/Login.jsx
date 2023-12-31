import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './Login.css'
import Navbar from '../components/NavbarLogged';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(0)
  const [err, setError] = useState(0)
  const [Success, setSuccess] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(0)
    setLoading(1)
    let data = {
      donor_email: email,
      donor_mob_number: password
    }
    await fetch(`${process.env.REACT_APP_BASE_URL}/donor/verify`, {
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
          console.log(json.token)
          setSuccess(1)
          navigate("/profile");
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
        <h2><strong>Log In as Donor</strong></h2>
        <div className="form_input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="password">Mobile Number:</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
        {loading ? <div id="loading">Logging in... Please wait</div> : <></>}
        {err ? <div className="error">Please recheck your credentials</div> : <></>}
        {Success ? <div id="success">Success</div> : <></>}
      </form>
    </div>
  </>
  )
}

export default Login;