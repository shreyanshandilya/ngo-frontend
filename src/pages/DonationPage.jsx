import { useState, useEffect } from "react"
import './Signup.css'
import Navbar from '../components/NavbarLogged';
import axios from "axios";
import { SignalCellularNull } from "@mui/icons-material";

const DonationPage = () => {

    const [product_title, setTitle] = useState('');
    const [product_category, setCategory] = useState('');
    const [product_description_before, setDescription] = useState('');
    const [product_defects_before, setDefects] = useState('');
    const [product_area_of_donation, setArea] = useState('');
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);
    const [Success, setSuccess] = useState(false)
    const [image, setImage] = useState([])

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
        setSuccess(0);
        setError(0);
        let data = {
            product_title, product_category, product_description_before, product_defects_before, product_area_of_donation,
            donor_mob_number: donor["donor"]["donor_mob_number"]
        }
        const formData = new FormData();
        for (let prop in data) {
            formData.append(prop, data[prop]);
        }
        for (const img of image) { // images is an array of File Object
            formData.append('image', img, img.name); // multiple upload
        }
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/product`,
            formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
            }
        )
        if (response.data.message == 'Donation Success') {
            setLoading(0);
            setSuccess(1);
        }
        else {
            setError(1);
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files);
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
                            multiple
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                    {loading ? <div>Donating</div> : <></>}
                    {Success ? <div>Succefully Donated</div> : <></>}
                    {Error ? <div>Some error occured</div> : <></>}
                    <br></br>
                </form>
                : <></>}
        </div>
    </>
    )
}

export default DonationPage;