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

    await fetch(`${process.env.REACT_APP_BASE_URL}/agent/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
          setLoading(0)
      });
  }
  return (
    <div className="conts">
      <form className="form">
        <h1>Agent Registration</h1>
        <div className="form_input">
          <label htmlFor="agent_name">Agent Name</label>
          <input
            id="agent_name"
            name="agent_name"
            value={agent_name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="agent_aadhar_number">Aadhar Number</label>
          <input
            name="agent_aadhar_number"
            id="agent_aadhar_number"
            value={agent_aadhar_number}
            onChange={e => setAadharNumber(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="agent_operation_area">Operation Area</label>
          <input
            name="agent_operation_area"
            id="agent_operation_area"
            value={agent_operation_area}
            onChange={e => setOperationArea(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="agent_address">Address</label>
          <input
            name="agent_address"
            id="agent_address"
            value={agent_address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="agent_mob_number">Mobile Number</label>
          <input
            id="agent_mob_number"
            name="agent_mob_number"
            value={agent_mob_number}
            onChange={e => setNumber(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="agent_email">Email</label>
          <input
            id="agent_email"
            name="agent_email"
            value={agent_email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="agent_id_type">Id Type</label>
          <select
            id="agent_id_type"
            name="agent_id_type"
            value={agent_id_type}
            onChange={e => setType(e.target.value)}
          >
            {list}
          </select>
        </div>
        <div className="form_input">
          <label htmlFor="active">Active</label>
          <div className="radio-container">
            Yes
            <input
              type="radio"
              value={agent_active}
              name="active"
              onChange={(e) => {
                if (agent_active == 0) setActive(1);
              }} className="radio"
              />
            No
            <input
              type="radio"
              value="No"
              name="active"
              onChange={(e) => {
                if (agent_active == 1) setActive(0);
              }} className="radio"
            />

          </div>
        </div>
        <label><strong>You will be made active upon Verification</strong></label>
        <br />
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