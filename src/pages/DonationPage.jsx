import { useState, useEffect } from "react"
import './Signup.css'
import Navbar from '../components/Navbar';

const DonationPage = () => {

    const [product_title, setTitle] = useState('');
    const [product_category, setCategory] = useState('');
    const [product_description_before, setDescription] = useState('');
    const [product_defects_before, setDefects] = useState('');
    const [product_area_of_donation, setArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);

    const [donor, setDonor] = useState({});
    const token = localStorage.getItem("token")
    useEffect(() => {
        setLoading(true)
        fetch('https://ngo-api.onrender.com/donor/view', {
            headers : {"Authorization" : `Bearer ${token}`}
        })
            .then(response => response.json())
            .then(data => {
                setDonor(data)
                setLoading(false)
            });
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(1);
        let data = {
            product_title, product_category, product_description_before, product_defects_before, product_area_of_donation, 
            donor_mob_number : donor["donor"]["donor_mob_number"]
        }
        await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
            });
    }

    return (
        <>
        <Navbar/>
        <div className="signup">
            { !donor["donor"] ? <>Loading</> : <></>}
            { donor["donor"] ? <>
            <form>
                <h1>Enter Product Details</h1>
                <label>Title</label>
                <input value={product_title} onChange={e => setTitle(e.target.value)}></input>
                <br></br>
                <label>Category</label>
                <input value={product_category} onChange={e => setCategory(e.target.value)}></input>
                <br></br>
                <label>Description</label>
                <input value={product_description_before} onChange={e => setDescription(e.target.value)}></input>
                <br></br>
                <label>Defects</label>
                <input value={product_defects_before} onChange={e => setDefects(e.target.value)}></input>
                <br></br>
                <label>Area of Donation</label>
                <input value={product_area_of_donation} onChange={e => setArea(e.target.value)}></input>
                <br></br>
                <br></br>
                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
                {loading ? <div>Donation Succesful</div> : <></>}
                {Error ? <div>Some error occured</div> : <></>}
                <br></br>
            </form>
            </> : <></>}
        </div>
        </>
    )
}

export default DonationPage;