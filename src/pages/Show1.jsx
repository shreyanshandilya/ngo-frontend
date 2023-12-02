import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useParams } from "react-router-dom";
import './Show1.css'
import { AuthVerify } from "../helper/JWTVerify";
import Navbar from '../components/NavbarLogged';

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
    const [agent, setAgent] = useState("0");
    const [agentActive, setAgentActive] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [repairModal, setRepairModal] = useState(false);
    const [otpModal, setOtpModal] = useState(false);
    const [info, setDefects] = useState('');
    const [description, setDescription] = useState('');
    const [otpVal, setOtpVal] = useState('');
    const [price, setPrice] = useState('');

    const claim = () => {
        setLoading1(true)
        setError(false)
        let data = {
            product_id: formId,
            agent_id: agent
        }
        fetch(`https://ngo-api.onrender.com/product/assign_agent`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    setError(true);
                    setLoading1(false)
                }
                else {
                    setSuccess(true);
                    setLoading1(false);
                }
            });
    }

    const collect = (e) => {
        setError(0)
        e.preventDefault();
        setLoading1(true)
        let data = {
            product_id: formId,
            agent_id: agent,
            product_otp: otpVal
        }
        fetch(`https://ngo-api.onrender.com/product/collect`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.message == "Product succesfully collected") {
                    setSuccess(true);
                    setLoading1(false);
                }
                else {
                    setError(true);
                    setLoading1(false)
                }
            });
    }

    const otp = () => {
        setOtpModal(true)
    }

    const repair = () => {
        setRepairModal(true)
    }


    const repairSubmit = (e) => {
        setError(0)
        e.preventDefault();
        let data = {
            product_id: formId,
            agent_id: agent,
            product_description_after: description,
            product_defects_after: info,
            prodcut_repair_amount: price
        }
        fetch(`https://ngo-api.onrender.com/product/repair`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.message == "Product details Succesfully Updated") {
                    setSuccess(true);
                    setLoading1(false);
                }
                else {
                    setError(true);
                    setLoading1(false)
                }
            });
    }

    const handover = () => {
        setLoading1(true)
        setError(false)
        let data = {
            product_id: formId,
            agent_id: agent
        }
        fetch(`https://ngo-api.onrender.com/product/receive`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    setError(true);
                    setLoading1(false)
                }
                else {
                    setSuccess(true);
                    setLoading1(false);
                }
            });
    }

    useEffect(() => {
        if (AuthVerify(localStorage.getItem("token")) && localStorage.getItem("role") == "agent") {
            const token = localStorage.getItem("token")
            fetch('https://ngo-api.onrender.com/agent/view', {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    setAgent(data["agent"]["_id"])
                    setAgentActive(data["agent"]["agent_active"])
                });
        }
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
            <Navbar />
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
                            <p><strong>Description </strong><br></br>{item.product_repair_status ? item.product_description_after : item.product_description_before}</p>
                            <p><strong>Defects  </strong>{item.product_repair_status ? item.product_defects_after : item.product_defects_before}</p>
                            <p><strong>Area of Donation  </strong> {item.product_area_of_donation}</p>
                            <p><strong>Collection Status  </strong> {item.product_collection_status == false ? "Not Collected" : "Collected"}</p>
                            <p><strong>Reimbursement Status  </strong> {item.product_reimbursement_status == false ? "False" : "True"}</p>
                            <p><strong>Repair Status  </strong> {item.product_repair_status == false ? "Not Repaired" : "Repaired"}</p>


                            {(agent != "0" && agentActive) ?
                                <>
                                    {item.product_agent ?
                                        (item.product_agent["_id"] === agent ?
                                            <>
                                                {!item.product_collection_status ? <>
                                                    <button onClick={otp}>COLLECT</button>
                                                    {otpModal ? <>
                                                        <form>
                                                            <div className="form_input">
                                                                <label htmlFor="otpval">Enter OTP:</label>
                                                                <input
                                                                    type="text"
                                                                    id="otpval"
                                                                    name="otp"
                                                                    value={otpVal}
                                                                    onChange={(e) => setOtpVal(e.target.value)}
                                                                />
                                                            </div>
                                                            <button onClick={collect}>SUBMIT</button>
                                                            {error ? <p>ERROR! Please try again</p> : <></>}
                                                            {success ? <p>Successfully Collected!</p> : <></>}
                                                            {loading1 ? <p>Processing Request....</p> : <></>}
                                                        </form>
                                                    </> : <></>

                                                    }
                                                </> : (
                                                    <>
                                                        {!item.product_repair_status ?
                                                            <>
                                                                <button onClick={repair}>REPAIR</button>
                                                                {repairModal ? <>
                                                                    <form>
                                                                        <div className="form_input">
                                                                            <label htmlFor="description">Description:</label>
                                                                            <input
                                                                                type="text"
                                                                                id="description"
                                                                                name="description"
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="form_input">
                                                                            <label htmlFor="defects">Defects:</label>
                                                                            <input
                                                                                id="defects"
                                                                                name="defects"
                                                                                value={info}
                                                                                onChange={(e) => setDefects(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="form_input">
                                                                            <label htmlFor="price">Price:</label>
                                                                            <input
                                                                                type="text"
                                                                                id="price"
                                                                                name="price"
                                                                                value={price}
                                                                                onChange={(e) => setPrice(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <button onClick={repairSubmit}>SUBMIT</button>
                                                                        {error ? <p>ERROR! Please try again</p> : <></>}
                                                                        {success ? <p>Successfully Submitted!</p> : <></>}
                                                                        {loading1 ? <p>Processing Request....</p> : <></>}
                                                                    </form>
                                                                </> : <></>}
                                                            </>
                                                            : <></>}
                                                    </>
                                                )
                                                }</>
                                            : <></>)
                                        :
                                        <>
                                            <button onClick={claim}>CLAIM</button>
                                            {error ? <p>ERROR! Please try again</p> : <></>}
                                            {success ? <p>Successfully Claimed!</p> : <></>}
                                            {loading1 ? <p>Processing Request....</p> : <></>}
                                        </>}
                                </>
                                : <></>
                            }


                            {item.product_repair_status && !item.product_received ?
                                <>
                                    <button onClick={handover}>
                                        HANDOVER
                                    </button>
                                    {error ? <p>ERROR! Please try again</p> : <></>}
                                    {success ? <p>Successfully Donated!</p> : <></>}
                                    {loading1 ? <p>Processing Request....</p> : <></>}
                                </> :

                                <></>
                            }

                            {item.product_received ?
                                <p style={{ 'color': 'green', }}><strong>
                                    Prodcut Already Donated
                                </strong></p> :

                                <></>
                            }
                            {(agent != "0" && (!agentActive)) ?
                                <div>
                                    <p style={{ 'color': 'red' }}><strong>Agent Not Active</strong></p>
                                </div> : <></>
                            }
                        </div>
                    </div>
                    <div className="donorInfo">
                        <p style={{ "fontSize": "200%" }}><strong>Donor Details</strong></p>
                        <p><strong>Name:  </strong>{item.product_donor.donor_name}</p>
                        <p><strong>Mobile Number:  </strong>{item.product_donor.donor_mob_number}</p>
                        <p><strong>Address:  </strong>{item.product_donor.donor_address}</p>
                        <p><strong>Email:  </strong>{item.product_donor.donor_email}</p>
                    </div>
                </> : <></>
            }
        </>
    )
}

export default Individual;