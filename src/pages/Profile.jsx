import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import './ProfileStyles.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '40vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain'
}

function Card(item) {
    const url = `/view/${item["_id"]}`
    return (
        <div style={{ "display": "flex", "backgroundColor": "white", "width": "100%", "position": "relative" }}>
            <p style={{ "fontSize": "100%" }}><strong>{item["product_title"]}</strong></p>
            <p style={{ "margin-left": "2%" }}>{item.product_description_before} </p>
            <Link to={url} style={{ "textDecoration": "none", "position": "absolute", "margin": "0 0 0 90%" }}><p style={{ "margin-left": "70%", "width": "100%", "border": "1px solid black", "cursor": "pointer", "color": "black" }}>VIEW</p></Link>
        </div>
    )
}

function Profile() {
    const [loading, setLoading] = useState(false);
    const [donor, setDonor] = useState({});
    const token = localStorage.getItem("token");
    let o = []
    const products = [];
    useEffect(() => {
        setLoading(true)
        fetch('https://ngo-api.onrender.com/donor/view', {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                setDonor(data)
                setLoading(false)
            });
    }, []);
    if (donor["donor"]) donor["donor"]["donor_products"].map(product => products.push(Card(product)))
    return (
        <center>
            <Navbar />
            {!donor["donor"] ? <h1>Loading</h1> : <></>}
            {donor["donor"] ? <>
                <div></div>
                <div className='profile-level-up'>
                    <div className="profile" style={{ "backgroundColor": "white" }}>
                        <div className="header">
                            <div className="image">
                                <img src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw"></img>
                            </div>
                            <div className="info">
                                <h2>{donor["donor"]["donor_name"]}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="personalDetails" style={{ "backgroundColor": "white" }}>
                        <div>
                            <span className="title">Name</span>
                            <span className="answer">{donor["donor"]["donor_name"]}</span>
                        </div>
                        <div>
                            <span className="title">Mobile Number</span>
                            <span className="answer">{donor["donor"]["donor_mob_number"]}</span>
                        </div>
                        <div>
                            <span className="title">Email</span>
                            <span className="answer">{donor["donor"]["donor_email"]}</span>
                        </div>
                        <div>
                            <span className="title">Address</span>
                            <span className="answer">{donor["donor"]["donor_address"]}</span>
                        </div>
                        <div>
                            <span className="title">ID Type</span>
                            <span className="answer">{donor["donor"]["donor_id_type"]}</span>
                        </div>
                        <div>
                            <span className="title">{donor["donor"]["donor_id_type"]} Number</span>
                            <span className="answer">{donor["donor"]["donor_id_number"]}</span>
                        </div>
                        <div>
                            <span className="title">Anonymous</span>
                            <span className="answer">{donor["donor"]["donor_anonymous"] ? "Yes" : "No"}</span>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ "margin": "0 0 0 10%", "display": "flex" }}>
                    <h1>Your Donations</h1>
                    <Link to="/donate_product">
                        <button style={{ "width": "10em", "height": "4em", "position": "absolute", "margin": "0 0 0 55%" }}>
                            <h2>DONATE</h2>
                        </button>
                    </Link>
                </div>
                <div className="personalDetails">
                    {products}
                </div>
            </> : <></>
            }
        </center >
    )
}

export default Profile;