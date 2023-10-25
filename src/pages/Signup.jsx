import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import './Signup.css'

const Signup = () => {

  const [donor_name, setName] = useState('');
  const [donor_mob_number, setNumber] = useState('');
  const [donor_address, setAddress] = useState('');
  const [donor_email, setEmail] = useState('');
  const [donor_id_type, setType] = useState('Aadhar Card');
  const [donor_id_number, setIType] = useState(0);
  const [donor_pan_number, setINumber] = useState('');
  const [donor_anonymous, setAnonymous] = useState(0);
  const { signup, error, isLoading } = useSignup();
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
        if(json.token) {
          setLoading(0);
          localStorage.setItem("token",json.token)
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
        <label>Donor Name</label>
        <input value={donor_name} onChange={e => setName(e.target.value)}></input>
        <br></br>
        <label>Donor Mobile Number</label>
        <input value={donor_mob_number} onChange={e => setNumber(e.target.value)}></input>
        <br></br>
        <label>Donor Address</label>
        <input value={donor_address} onChange={e => setAddress(e.target.value)}></input>
        <br></br>
        <label>Donor Email</label>
        <input value={donor_email} onChange={e => setEmail(e.target.value)}></input>
        <br></br>
        <label>Donor Id Type</label>
        <select onChange={e => setType(e.target.value)}>
          {list}
        </select>
        <br></br>
        <label>Donor {donor_id_type} Number</label>
        <input value={donor_pan_number} onChange={e => setINumber(e.target.value)}></input>
        <br></br>
        <label>Donor Anonymous</label>
        Yes
        <input type="radio" value={donor_anonymous} name="anonymous" onChange={(e) => {
          if (donor_anonymous == 0) setAnonymous(1);
        }} className="radio"></input>
        No
        <input type="radio" value="No" name="anonymous" onChange={(e) => {
          if (donor_anonymous == 1) setAnonymous(0);
        }} className="radio"></input>
        <br></br>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {loading ? <div>Signing you up.. Please wait</div> : <></>}
        {Error ? <div>Looks like the given account is already signed up</div> : <></>}
        <br></br>
      </form>
    </div>
  )
}

export default Signup;