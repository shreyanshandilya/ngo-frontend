import React, { useState, useEffect } from "react";
import './ProfileStyles.css';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";
import prod from '../images/prod.jpg'
import { useNavigate } from "react-router-dom";
import { AuthVerify } from "../helper/JWTVerify";
import Navbar from '../components/NavbarLogged';
import { green } from "@mui/material/colors";

function Card(item) {
    const url = `/view/${item["_id"]}`
    return (
        <div className="strip">
            <Link className="product" to={url} style={{ 'text-decoration': 'none', 'color': 'black' }}>
                <p style={{ 'margin': '0' }}><strong>{item["product_title"]}</strong></p>
                <p className="description">{item.product_description_before} </p>
                <p style={{ "marginLeft": "auto", "marginBottom": "0" }}>{item.product_otp ? <h5 style={{ "color": "green", "marginBottom": "0" }}><strong>{item.product_otp}</strong></h5> : <></>}</p>
            </Link>
        </div>
    )
}

function Profile() {
    const [loading, setLoading] = useState(false);
    const [donor, setDonor] = useState({});
    const [visible, setVisible] = useState();
    const [loading1, setLoading1] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/");
    }
    const [products, setProducts] = useState([])
    useEffect(() => {
        setLoading(true)
        if (AuthVerify(localStorage.getItem("token")) && localStorage.getItem("role") != "donor") {
            navigate("/");
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/donor/view`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                setDonor(data)
                setLoading(false)
            });
    }, []);

    const view = () => {
        setLoading(1)
        setVisible(true)
        fetch(`${process.env.REACT_APP_BASE_URL}/product/`)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                for (let i = 0; i < data.length; i++) {
                    if (data[i]["product_donor"] == donor["donor"]["_id"]) {
                        let a = products
                        a.push(Card(data[i]))
                        setProducts(a)
                    }
                }
            })
        setLoading1(false)
    }

    return (
        <>
            <Navbar />
            {!donor["donor"] ? <h1>Loading</h1> : <></>}
            {donor["donor"] ?
                <>
                    <div className='profile-level-up'>
                        <div className="profile" >
                            <img className="profile-pic" src={prod}></img>
                        </div>
                        <div className="personalDetails">
                            <div>
                                <span className="title">Name:</span>
                                <span className="answer">{donor["donor"]["donor_name"]}</span>
                            </div>
                            <div>
                                <span className="title">Mobile Number:</span>
                                <span className="answer">{donor["donor"]["donor_mob_number"]}</span>
                            </div>
                            <div>
                                <span className="title">Email:</span>
                                <span className="answer">{donor["donor"]["donor_email"]}</span>
                            </div>
                            <div>
                                <span className="title">Address:</span>
                                <span className="answer">{donor["donor"]["donor_address"]}</span>
                            </div>
                            <div>
                                <span className="title">ID Type:</span>
                                <span className="answer">{donor["donor"]["donor_id_type"]}</span>
                            </div>
                            <div>
                                <span className="title">{donor["donor"]["donor_id_type"]} Number:</span>
                                <span className="answer">{donor["donor"]["donor_id_number"]}</span>
                            </div>
                            <div>
                                <span className="title">Anonymous:</span>
                                <span className="answer">{donor["donor"]["donor_anonymous"] ? "Yes" : "No"}</span>
                            </div>
                            <Link to="/donate_product">
                                <p className="button" style={{ 'width': 'fit-content', "border": "0px" }} >
                                    Donate
                                </p>
                            </Link>
                            <p className="button" style={{ 'width': 'fit-content', "cursor": "pointer", "backgroundColor": "rgba(255, 0, 0, 0.7)", "border": "0px" }} onClick={handleLogout}>
                                Logout
                            </p>
                        </div>
                    </div>
                    <div className="profile-level-up" style={{ 'flex-direction': 'column' }}>
                        <h2><strong>Your Donations</strong></h2>
                        {loading1 ? <p>Loading..</p> : <></>}
                        <button className="donate" style={{ 'padding': '0.5% 1% 0.5% 1%' }} onClick={view}>VIEW</button>
                        <div className="product-list" style={{ "width": "80%" }}>
                            {visible ? <>{products}</> : <></>}
                        </div>
                    </div>

                </> : <></>

            }
        </ >
    )
}

export default Profile;