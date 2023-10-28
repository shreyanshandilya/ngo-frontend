import { useState } from "react"
import { useSignupAgent } from "../../hooks/useSignupAgent"
import '../Signup.css'
import axios from "axios"

const AgentSignup = () => {

  const [agent_name, setName] = useState('');
  const [agent_aadhar_number, setAadharNumber] = useState('');
  const [agent_operation_area, setOperationArea] = useState('');
  const [agent_address, setAddress] = useState('');
  const [agent_mob_number, setNumber] = useState('');
  const [agent_email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agent_id_type, setType] = useState('Aadhar Card');
  const [agent_active, setActive] = useState(0);
  const { signup, error, isLoading } = useSignupAgent();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  const card = ["Aadhar Card", "Pan Card", "Driving License", "Passport"];
  let list = []
  card.forEach(a => {
    list.push(<option value={a}>{a}</option>)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(1);
    let data = {
      agent_name,
      agent_aadhar_number,
      agent_operation_area,
      agent_address,
      agent_mob_number,
      agent_email,
      username,
      password,
      agent_id_type,
      agent_active
    }

    await axios.post(`${process.env.REACT_APP_BASE_URL}/agent/register`, data, {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }
    )
      .then(res => {
        if (res.data.token) {
          setLoading(0);
          localStorage.setItem("token", res.data.token)
          setError(0);
        }
        else {
          setLoading(0);
          setError(1);
        }
      });
  }
  return (
    <div className="signup">
      <form>
        <h1>SIGN UP</h1>
        <label>Agent Name</label>
        <input value={agent_name} onChange={e => setName(e.target.value)}></input>
        <br></br>
        <label>Aadhar Number</label>
        <input value={agent_aadhar_number} onChange={e => setAadharNumber(e.target.value)}></input>
        <br></br>
        <label>Operation Area</label>
        <input value={agent_operation_area} onChange={e => setOperationArea(e.target.value)}></input>
        <br></br>
        <label>Address</label>
        <input value={agent_address} onChange={e => setAddress(e.target.value)}></input>
        <br></br>
        <label>Mobile Number</label>
        <input value={agent_mob_number} onChange={e => setNumber(e.target.value)}></input>
        <br></br>
        <label>Email</label>
        <input value={agent_email} onChange={e => setEmail(e.target.value)}></input>
        <br></br>

        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)}></input>
        <br></br>
        <label>Password</label>
        <input value={password} type="password" onChange={e => setPassword(e.target.value)}></input>
        <br></br>

        <label>Agent Id Type</label>
        <select onChange={e => setType(e.target.value)}>
          {list}
        </select>
        <br></br>
        <label>Active</label>
        Yes
        <input type="radio" value={agent_active} name="active" onChange={(e) => {
          if (agent_active == 0) setActive(1);
        }} className="radio"></input>
        No
        <input type="radio" value="No" name="active" onChange={(e) => {
          if (agent_active == 1) setActive(0);
        }} className="radio"></input>
        <br></br>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {loading ? <div>Signing you up.. Please wait</div> : <></>}
        {Error ? <div>Looks like the given account is already signed up</div> : <></>}
      </form>
    </div>
  )
}

export default AgentSignup;