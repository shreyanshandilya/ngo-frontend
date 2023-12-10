import { useState, useEffect } from "react"
import './Signup.css'
import Navbar from '../components/NavbarLogged';

const DonationPage = () => {

    const [product_title, setTitle] = useState('');
    const [product_category, setCategory] = useState('');
    const [product_description_before, setDescription] = useState('');
    const [product_defects_before, setDefects] = useState('');
    const [product_area_of_donation, setArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);
    const [image, setImage] = useState({})

    const [donor, setDonor] = useState({});
    const token = localStorage.getItem("token")
    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_BASE_URL}/donor/view`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                setDonor(data)
                setLoading(false)
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(1);
        let data = {
            product_title, product_category, product_description_before, product_defects_before, product_area_of_donation,
            donor_mob_number: donor["donor"]["donor_mob_number"], image
        }
        const formData = new FormData();
        for(let prop in data) {
            formData.append(prop, data[prop]);
        }
        await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(formData)
                console.log(json)
            });
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    return (<>
        <Navbar />
        <div className="conts">
            {!donor["donor"] ? <h1><strong>Please Login As A Donor</strong></h1> : <></>}
            {donor["donor"] ?
                <form className="form">
                    <h1><strong>Enter Product Details</strong></h1>
                    <div className="form_input">
                        <label htmlFor="product_title">Title</label>
                        <input
                            id="product_title"
                            name="product_title"
                            value={product_title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="product_category">Category</label>
                        <input
                            id="product_category"
                            name="product_category"
                            value={product_category}
                            onChange={e => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="product_description_before">Description</label>
                        <textarea
                            id="product_description_before"
                            name="product_description_before"
                            value={product_description_before}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="product_defects_before">Defects</label>
                        <textarea
                            id='product_defects_before'
                            name="product_defects_before"
                            value={product_defects_before}
                            onChange={e => setDefects(e.target.value)}
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="product_area_of_donation">Area of Donation</label>
                        <input
                            id="product_area_of_donation"
                            name="product_area_of_donation"
                            value={product_area_of_donation}
                            onChange={e => setArea(e.target.value)}
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="product_image">Image </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                    {loading ? <div>Donation Succesful</div> : <></>}
                    {Error ? <div>Some error occured</div> : <></>}
                    <br></br>
                </form>
                : <></>}
        </div>
    </>
    )
}

export default DonationPage;