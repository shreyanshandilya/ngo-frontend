import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useParams } from "react-router-dom";
import './Show1.css'
import { AuthVerify } from "../helper/JWTVerify";
import Navbar from '../components/NavbarLogged';
import axios from "axios";

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
    const [image, setImage] = useState([])
    const [handoverModal, setHandoverModal] = useState(false);
    const [receiverName, setReceiverName] = useState('');
    const [receiverAadharNumber, setReceiverAadharNumber] = useState('');
    const [isAgent, setisAgent] = useState(false);

    const claim = () => {
        setLoading1(true)
        setError(false)
        let data = {
            product_id: formId,
            agent_id: agent
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/product/assign_agent`, {
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
        fetch(`${process.env.REACT_APP_BASE_URL}/product/collect`, {
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

    const repairSubmit = async (e) => {
        setError(0)
        setLoading(1);
        setSuccess(0);
        setError(0);
        e.preventDefault();
        let data = {
            product_id: formId,
            agent_id: agent,
            product_description_after: description,
            product_defects_after: info,
            prodcut_repair_amount: price
        }
        const formData = new FormData();
        for (let prop in data) {
            formData.append(prop, data[prop]);
        }
        for (const img of image) { // images is an array of File Object
            formData.append('image', img, img.name); // multiple upload
        }

        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/product/repair`,
            formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                },
            }
        )
        if (response.data.message == 'Product details Succesfully Updated') {
            setLoading(0);
            setSuccess(1);
        }
        else {
            setError(1);
        }
        // fetch(`${process.env.REACT_APP_BASE_URL}/product/repair`, {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         if (json.message == "Product details Succesfully Updated") {
        //             setSuccess(true);
        //             setLoading1(false);
        //         }
        //         else {
        //             setError(true);
        //             setLoading1(false)
        //         }
        //     });
    }

    const handleImageChange = (e) => {
        setImage(e.target.files);
    }


    const handover = () => {
        setHandoverModal(true);
    }

    const handoverSubmit = (e) => {
        e.preventDefault();
        setLoading1(true)
        setError(false)
        let data = {
            product_id: formId,
            receiver_aadhar_number: receiverAadharNumber,
            receiver_name: receiverName,
            agent_id: agent
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/product/receive`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.message == "Final Donation Successful") {
                    setSuccess(true);
                    setLoading1(false);
                }
                else {
                    console.log(json.message);
                    setError(true);
                    setLoading1(false)
                }
            });
    }

    useEffect(() => {
        if (AuthVerify(localStorage.getItem("token")) && localStorage.getItem("role") == "agent") {
            setisAgent(true);
            console.log(isAgent)
            const token = localStorage.getItem("token")
            fetch(`${process.env.REACT_APP_BASE_URL}/agent/view`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    setAgent(data["agent"]["_id"])
                    setAgentActive(data["agent"]["agent_active"])
                });
        }
        setLoading(true)
        fetch(`${process.env.REACT_APP_BASE_URL}/product/${formId}`)
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

                            {isAgent ? <>
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
                                                                            <div className="form_input">
                                                                                <label htmlFor="product_image">Image </label>
                                                                                <input
                                                                                    type="file"
                                                                                    onChange={handleImageChange}
                                                                                    multiple
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
                                }</> : <></>}

                            {isAgent ? <>
                                {item.product_repair_status && !item.product_received ?
                                    <>
                                        <button onClick={handover}>HANDOVER</button>
                                        {handoverModal ?
                                            <form>
                                                <div className="form_input">
                                                    <label htmlFor="receiverName">Receiver Name:</label>
                                                    <input
                                                        type="text"
                                                        id="receiverName"
                                                        name="receiverName"
                                                        value={receiverName}
                                                        onChange={(e) => setReceiverName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form_input">
                                                    <label htmlFor="receiverAadharNumber">Aadhar Number:</label>
                                                    <input
                                                        type="text"
                                                        id="receiverAadharNumber"
                                                        name="receiverAadharNumber"
                                                        value={receiverAadharNumber}
                                                        onChange={(e) => setReceiverAadharNumber(e.target.value)}
                                                    />
                                                </div>
                                                <button onClick={handoverSubmit}>SUBMIT</button>
                                                {error ? <p>ERROR! Please try again</p> : <></>}
                                                {success ? <p>Successfully Donated!</p> : <></>}
                                                {loading1 ? <p>Processing Request....</p> : <></>}
                                            </form>
                                            : <></>}

                                    </> :

                                    <></>
                                }</> : <></>}

                            {item.product_received ?
                                <p style={{ 'color': 'green', }}><strong>
                                    Product Already Donated
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
                    <div className="oneProduct">
                        <div className="productDetailsDiv">
                            <p style={{ "fontSize": "200%" }}>Donated By: <strong>{item.product_donor.donor_name}</strong></p>
                            <p><strong>Mobile Number:  </strong>{item.product_donor.donor_mob_number}</p>
                            <p><strong>Address:  </strong>{item.product_donor.donor_address}</p>
                            <p><strong>Email:  </strong>{item.product_donor.donor_email}</p>
                        </div>
                    </div>
                </> : <></>
            }
            {item.product_received ? <div className="oneProduct">
                <div className="productDetailsDiv">
                    <p style={{ "fontSize": "200%" }}><strong>Receiver Details</strong></p>
                    <p><strong>Name : </strong>{item.product_receiver.receiver_name}</p>
                    <p><strong>Aadhar Number : </strong>{item.product_receiver.receiver_aadhar_number}</p>
                </div>
            </div>
                : <></>}
            {item.product_repair_status ? <>
                <div className="oneProduct">
                    <div className="SliderDivOne">
                        <Slide>
                            {item.product_pictures_after.map((slideImage, index) => (
                                <div key={index}>
                                    <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                    </div>
                                </div>
                            ))}
                        </Slide>
                    </div>
                    <div className="productDetailsDiv">
                        <p style={{ "fontSize": "200%" }}><strong>Repair Details</strong></p>
                        <p><strong>Defects: </strong>{item.product_defects_after}</p>
                        <p><strong>Description: </strong>{item.product_description_after}</p>
                        <p><strong>Price: </strong>{item.product_repair_amount}</p>
                    </div>
                </div>
            </>
                :
                <></>
            }
        </>
    )
}

export default Individual;