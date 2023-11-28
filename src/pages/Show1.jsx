import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useParams } from "react-router-dom";
import NavbarLogged from "../components/NavbarLogged";
import Navbar from "../components/NavbarLogged";

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '40vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain'
}

function Individual() {
    const { formId } = useParams();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({});
    useEffect(() => {
        setLoading(true)
        fetch(`https://ngo-api.onrender.com/product/${formId}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setItem(data);
            });
    }, []);
    return (
        <>
            <NavbarLogged />
            {loading ? <h1>Loading</h1> : <></>}
            {item["_id"] ?
                <div style={{ "padding": "5%", "backgroundColor": "lightgray" }}>
                    <div style={{ "borderTop": "1px solid black", "borderBottom": "1px solid black", "margin": "2% 0", "textAlign": "left", "padding": "2%", "backgroundColor": "white" }}>
                        <p style={{ "fontSize": "150%" }}><strong>{item["product_title"]}</strong></p>
                        <p style={{ "fontSize": "120%" }}><strong>Category</strong> {item.product_category}</p>
                        <Slide>
                            {item.product_pictures_before.map((slideImage, index) => (
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
                    </div>
                    <div style={{ "borderTop": "1px solid black", "borderBottom": "1px solid black", "margin": "2% 0", "textAlign": "left", "padding": "2%", "backgroundColor": "white" }}>
                        <p style={{ "fontSize": "150%" }}><strong>DONOR DETAILS</strong></p>
                        <p><strong>Name</strong></p>
                        <p>{item.product_donor.donor_name}</p>
                        <p><strong>Mobile Number</strong></p>
                        <p>{item.product_donor.donor_mob_number}</p>
                        <p><strong>Address</strong></p>
                        <p>{item.product_donor.donor_address}</p>
                        <p><strong>Email</strong></p>
                        <p>{item.product_donor.donor_email}</p>
                    </div>
                </div> : <></>}
        </>
    )
}

export default Individual;