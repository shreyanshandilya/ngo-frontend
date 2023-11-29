import React, { useState, useEffect } from "react";
import './ProfileStyles.css';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";
import prod from '../images/prod.jpg'

function Card(item) {
    const url = `/view/${item["_id"]}`
    return (
        <div>
            <Link className="product" to={url} style={{ 'text-decoration': 'none', 'color': 'black' }}>
                <p style={{ 'margin': '0' }}><strong>{item["product_title"]}</strong></p>
                <p className="description" >{item.product_description_before} </p>
            </Link>
            <br />
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
        <>
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
                                <p className="button" style={{ 'width': '20%' }} >
                                    Donate
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="profile-level-up" style={{ 'flex-direction': 'column' }}>
                        <div className="strip">
                            <h2>Your Donations</h2>
                        </div>
                        <br />
                        <div className="product-list" style={{ "width": "80%" }}>
                            {products}
                        </div>
                    </div>

                </> : <></>

            }
        </ >
    )
}

export default Profile;