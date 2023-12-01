import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import './Signup.css'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/NavbarLogged';

const Signup = () => {
  const navigate = useNavigate();
  const [donor_name, setName] = useState('');
  const [donor_mob_number, setNumber] = useState('');
  const [donor_address, setAddress] = useState('');
  const [donor_email, setEmail] = useState('');
  const [donor_id_type, setType] = useState('Aadhar Card');
  const [donor_id_number, setINumber] = useState('');
  const [donor_pan_number, setPANNumber] = useState('');
  const [donor_anonymous, setAnonymous] = useState(0);
  const { signup, error, isLoading } = useSignup();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  const card = ["Aadhar Card", "Driving License", "Passport"];
  let list = []
  card.forEach(a => {
    list.push(<option value={a}>{a}</option>)
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(1);
    let data = {
      donor_name, donor_mob_number, donor_address, donor_email, donor_id_type, donor_id_number, donor_pan_number, donor_anonymous
    }
    await fetch(`${process.env.REACT_APP_BASE_URL}/donor/register`, {
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
          navigate("/profile");
        }
        else {
          setLoading(0);
          setError(1);
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="conts">
        <form className="form">
          <h1><strong>Register as a Donor</strong></h1>
          <div className="form_input">
            <label htmlFor="donor_name">Donor Name</label>
            <input
              id="donor_name"
              name="donor_name"
              value={donor_name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="donor_mob_number">Mobile Number</label>
            <input
              id="donor_mob_number"
              name="donor_mob_number"
              value={donor_mob_number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="donor_address">Address</label>
            <input
              id="donor_address"
              name="donor_address"
              value={donor_address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="donor_email">Email</label>
            <input
              id="donor_email"
              name="donor_email"
              value={donor_email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="donor_id_type">Id Type</label>
            <select
              id="donor_id_type"
              name="donor_id_type"
              value={donor_id_type}
              onChange={e => setType(e.target.value)}
            >
              {list}
            </select>
          </div>
          <div className="form_input">
            <label htmlFor="donor_id_number">{donor_id_type} Number</label>
            <input
              id="donor_id_number"
              name="donor_id_number"
              value={donor_id_number}
              onChange={e => setINumber(e.target.value)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="donor_pan_number">Pan Number</label>
            <input
              id="donor_pan_number"
              name="donor_pan_number"
              value={donor_pan_number}
              onChange={e => setPANNumber(e.target.value)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="anonymous">Anonymous</label>
            <div className="radio-container">
              Yes
              <input
                type="radio"
                value={donor_anonymous}
                name="anonymous"
                onChange={(e) => {
                  if (donor_anonymous == 0) setAnonymous(1);
                }} className="radio"
              />
              No
              <input
                type="radio"
                value={donor_anonymous}
                name="anonymous"
                onChange={(e) => {
                  if (donor_anonymous == 1) setAnonymous(0);
                }} className="radio"
              />
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          {loading ? <div>Signing you up.. Please wait</div> : <></>}
          {Error ? <div>Looks like the given account is already signed up</div> : <></>}
        </form>
      </div>
    </>
  )
}

export default Signup;