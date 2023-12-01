import React, { useState, useEffect } from "react";
import './ProfileStyles.css';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";
import prod from '../../images/prod.jpg'
import { useNavigate } from "react-router-dom";
import { AuthVerify } from "../../helper/JWTVerify";

function Card(item) {
    const url = `/view/${item["_id"]}`
    return (
        <div className="strip">
            <Link className="product" to={url} target="_blank" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                <p style={{ 'margin': '0' }}><strong>{item["product_title"]}</strong></p>
                <p className="description" >{item.product_description_before} </p>
            </Link>
        </div>
    )
}

function Profile() {
    const [loading, setLoading] = useState(false);
    const [donor, setDonor] = useState({});
    const [visible, setVisible] = useState();
    const [loading1, setLoading1] = useState(false);
    const agent = [];
    const token = localStorage.getItem("token");
    let o = []
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/");
    }
    const [products, setProducts] = useState([])
    useEffect(() => {
        setLoading(true)
        if (AuthVerify(localStorage.getItem("token")) && localStorage.getItem("role") != "agent") {
            navigate('/');
        }
        fetch('https://ngo-api.onrender.com/agent/view', {
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
        fetch('https://ngo-api.onrender.com/product/')
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                for (let i = 0; i < data.length; i++) {
                    if(data[i]["product_agent"]==donor["agent"]["_id"]) {
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
            {!donor["agent"] ? <h1>Loading</h1> : <></>}
            {donor["agent"] ?
                <>
                    <div className='profile-level-up'>
                        <div className="profile" >
                            <img className="profile-pic" src={prod}></img>
                        </div>
                        <div className="personalDetails">
                            <div>
                                <span className="title">Name:</span>
                                <span className="answer">{donor["agent"]["agent_name"]}</span>
                            </div>
                            <div>
                                <span className="title">Mobile Number:</span>
                                <span className="answer">{donor["agent"]["agent_mob_number"]}</span>
                            </div>
                            <div>
                                <span className="title">Email:</span>
                                <span className="answer">{donor["agent"]["agent_email"]}</span>
                            </div>
                            <div>
                                <span className="title">Address:</span>
                                <span className="answer">{donor["agent"]["agent_address"]}</span>
                            </div>
                            <div>
                                <span className="title">ID Type:</span>
                                <span className="answer">{donor["agent"]["agent_id_type"]}</span>
                            </div>
                            <div>
                                <span className="title">{donor["agent"]["agent_id_type"]} Number:</span>
                                <span className="answer">{donor["agent"]["agent_aadhar_number"]}</span>
                            </div>
                            <div>
                                <span className="title">Active:</span>
                                <span className="answer">{donor["agent"]["agent_active"] ? "Yes" : "No"}</span>
                            </div>
                            <Link to="/donate_product">
                                <p className="button" style={{ 'width': 'fit-content', "border": "0px" }} >
                                    Products
                                </p>
                            </Link>
                            <p className="button" style={{ 'width': 'fit-content', "cursor": "pointer", "backgroundColor": "rgba(255, 0, 0, 0.7)", "border": "0px" }} onClick={handleLogout}>
                                Logout
                            </p>
                        </div>
                    </div>
                    <div className="profile-level-up" style={{ 'flex-direction': 'column' }}>
                        <h2>Your Donations</h2>
                        {loading1 ? <p>Loading..</p> : <></>}
                        <button onClick={view}>VIEW</button>
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