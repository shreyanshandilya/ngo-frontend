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
    <div style={{"borderTop":"1px solid black", "borderBottom":"1px solid black", "margin":"2% 0", "textAlign":"left", "padding":"2%", "backgroundColor":"white"}}>
        <p style={{"fontSize":"150%"}}><strong>{item["product_title"]}</strong></p>
        <p style={{"fontSize":"120%"}}><strong>Category</strong> {item.product_category}</p>
        <Slide>
         {item.product_pictures_before.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
        <p><strong>Description </strong><br></br>{item.product_description_before}</p>
        <p><strong>Defects </strong>{item.product_defects_before}</p>
        <p><strong>Area of Donation </strong> {item.product_area_of_donation}</p>
        <p><strong>Collection Status </strong> {item.product_collection_status == false ? "False" : "True"}</p>
        <p><strong>Reimbursement Status </strong> {item.product_reimbursement_status == false ? "False" : "True"}</p>
        <p><strong>Repair Status </strong> {item.product_repair_status == false ? "False" : "True"}</p>
        <p><strong>Repair Amount </strong> {item.product_repair_amount}</p>
        <p><strong>Received </strong> {item.product_received == false ? "False" : "True"}</p>
        <center>
            <Link to={url} style={{"textDecoration":"none"}}><p style={{"width":"50vw", "border":"1px solid black", "fontWeight":"bold", "cursor":"pointer", "padding":"1%", "color":"black"}}>VIEW</p></Link>
        </center>
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
            headers : {"Authorization" : `Bearer ${token}`}
        })
            .then(response => response.json())
            .then(data => {
                setDonor(data)
                setLoading(false)
            });
    },[]);
    if(donor["donor"]) donor["donor"]["donor_products"].map(product => products.push(Card(product)))
    return (
        <center>
            <Navbar/>
            {!donor["donor"] ? <h1>Loading</h1> : <></>}
            {donor["donor"] ? <>
            <div className="profile" style={{"backgroundColor":"white"}}>
                <div className="header">
                    <div className="image">
                        <img src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw"></img>
                    </div>
                    <div className="info">
                        <h2>{donor["donor"]["donor_name"]}</h2>
                        <h3>{donor["donor"]["donor_mob_number"]}</h3>
                        <h4>{donor["donor"]["donor_email"]}</h4>
                    </div> 
                </div>
            </div>
            <div className="personalDetails" style={{"backgroundColor":"white"}}>
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
                    <span className="title">Donor Anonymous</span>
                    <span className="answer">{donor["donor"]["donor_anonymous"] ? "Yes" : "No"}</span>
                </div>
            </div>
            <br></br>
            <Link to = "/donate_product">
                <button style={{"width":"80vw", "height":"10vh"}}>
                    <h2>DONATE</h2>
                </button>
            </Link>
            <br></br>
            <div className="personalDetails">
                {products}
            </div>
            </> : <></>}
        </center>
    )
}

export default Profile;