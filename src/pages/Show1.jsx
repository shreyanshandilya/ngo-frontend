import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useParams } from "react-router-dom";
import './Show1.css'

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
            {loading ? <h1>Loading</h1> : <></>}
            {item["_id"] ?
                <>
                    <div className='oneProduct'>
                        <div className="SliderDivOne">
                            <Slide>
                                {item.product_pictures_before.map((slideImage, index) => (
                                    <div key={index}>
                                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                        </div>
                                    </div>
                                ))}
                            </Slide>
                        </div>
                        <div className="productDetailsDiv">
                            <p style={{ "fontSize": "250%" }}><strong>{item["product_title"]}</strong></p>
                            <p style={{ "fontSize": "180%" }}><strong>{item.product_category}</strong></p>
                            <br />
                            <p><strong>Description </strong><br></br>{item.product_description_before}</p>
                            <p><strong>Defects  </strong>{item.product_defects_before}</p>
                            <p><strong>Area of Donation  </strong> {item.product_area_of_donation}</p>
                            <p><strong>Collection Status  </strong> {item.product_collection_status == false ? "Not Collected" : "Collected"}</p>
                            <p><strong>Reimbursement Status  </strong> {item.product_reimbursement_status == false ? "False" : "True"}</p>
                            <p><strong>Repair Status  </strong> {item.product_repair_status == false ? "Not Repaired" : "Repaired"}</p>
                        </div>

                    </div>
                    <div className="donorInfo">
                        <p style={{ "fontSize": "200%" }}><strong>Donor Details</strong></p>
                        <p><strong>Name:  </strong>{item.product_donor.donor_name}</p>
                        <p><strong>Mobile Number:  </strong>{item.product_donor.donor_mob_number}</p>
                        <p><strong>Address:  </strong>{item.product_donor.donor_address}</p>
                        <p><strong>Email:  </strong>{item.product_donor.donor_email}</p>
                    </div>


                </> : <></>}
        </>
    )
}

export default Individual;