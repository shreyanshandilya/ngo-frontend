import { useState } from "react"
import { useSignupAgent } from "../../hooks/useSignupAgent"
import '../Signup.css'
import axios from "axios"
import Navbar from '../../components/NavbarLogged'

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
  const [Success, setSuccess] = useState(false);
  const [image, setImage] = useState([])
  const [profile_pic, setProfilePic] = useState([])

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
    const formData = new FormData();
    for (let prop in data) {
      formData.append(prop, data[prop]);
    }
    formData.append('image', image);
    formData.append('image', profile_pic)

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/agent/register`,
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      }
    )
    if (response.data.message == 'Agent Successfully registered') {
      setLoading(0);
      setSuccess(1);
    }
    else {
      setError(1);
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }
  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  }

  return (<>
    <Navbar />
    <div className="conts">
      <form className="form">
        <h1><strong>Agent Registration</strong></h1>
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
          <label htmlFor="profile_pic">Your Photo </label>
          <input
            type="file"
            name='profile_pic'
            id="profile_pic"
            onChange={handleProfilePicChange}
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
        <label><strong>Please Upload Photo of Any ID:</strong></label>
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
          <label htmlFor="idCard">Image </label>
          <input
            type="file"
            name='idCard'
            id="idCard"
            onChange={handleImageChange}
          />
        </div>
        <label><strong>You will be made active upon Verification</strong></label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>

        {Success ? <div>Agent Signup success, admin verification pending</div> : <></>}
        {loading ? <div>Signing you up.. Please wait</div> : <></>}
        {Error ? <div>Looks like the given account is already signed up</div> : <></>}
      </form>
    </div>
  </>
  )
}

export default AgentSignup;