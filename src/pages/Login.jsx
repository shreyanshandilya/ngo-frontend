import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import axios from "axios"
import { useNavigate } from "react-router-dom";

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
    await fetch(`https://ngo-api.onrender.com/donor/verify`, {
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

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email :</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Mobile Number :</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSubmit}>Log in</button>
      {loading ? <div>Logging in.. Please wait</div> : <></>}
      {err ? <div className="error">Please recheck your username</div> : <></>}
      {Success ? <div>Success</div> : <></>}
    </form>
  )
}

export default Login;