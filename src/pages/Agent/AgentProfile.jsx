import React, { useState, useEffect } from "react";
import './ProfileStyles.css';
import 'react-slideshow-image/dist/styles.css';
import { Link } from "react-router-dom";
import prod from '../../images/prod.jpg'
import { useNavigate } from "react-router-dom";
import { AuthVerify } from "../../helper/JWTVerify";
import Navbar from '../../components/NavbarLogged'

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
    const [agent, setAgent] = useState({});
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
        if (AuthVerify(localStorage.getItem("token")) && localStorage.getItem("role") != "agent") {
            navigate('/');
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/agent/view`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                setAgent(data)
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
                    if (data[i]["product_agent"] == agent["agent"]["_id"]) {
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
            {!agent["agent"] ? <h1>Loading</h1> : <></>}
            {agent["agent"] ?
                <>
                    <div className='profile-level-up'>
                        <div className="profile" >
                            <img className="profile-pic" src={(agent['agent']['agent_photo']) ? (agent['agent']['agent_photo'].url) : prod}></img>
                        </div>
                        <div className="personalDetails">
                            <div>
                                <span className="title">Name:</span>
                                <span className="answer">{agent["agent"]["agent_name"]}</span>
                            </div>
                            <div>
                                <span className="title">Mobile Number:</span>
                                <span className="answer">{agent["agent"]["agent_mob_number"]}</span>
                            </div>
                            <div>
                                <span className="title">Email:</span>
                                <span className="answer">{agent["agent"]["agent_email"]}</span>
                            </div>
                            <div>
                                <span className="title">Address:</span>
                                <span className="answer">{agent["agent"]["agent_address"]}</span>
                            </div>
                            <div>
                                <span className="title">ID Type:</span>
                                <span className="answer">{agent["agent"]["agent_id_type"]}</span>
                            </div>
                            <div>
                                <span className="title">{agent["agent"]["agent_id_type"]} Number:</span>
                                <span className="answer">{agent["agent"]["agent_aadhar_number"]}</span>
                            </div>
                            <div>
                                <span className="title">Active:</span>
                                <span className="answer">{agent["agent"]["agent_active"] ? "Yes" : "No"}</span>
                            </div>
                            <Link to="/view">
                                <p className="button" style={{ 'width': 'fit-content', "border": "0px" }} >
                                    Products
                                </p>
                            </Link>
                            <p className="button" style={{ 'width': 'fit-content', "cursor": "pointer", "backgroundColor": "rgba(255, 0, 0, 0.7)", "border": "0px" }} onClick={handleLogout}>
                                Logout
                            </p>
                        </div>
                        <div className="profile-right " >
                            <img className="id_card_pic" src={(agent['agent']['agent_id_photo']) ? (agent['agent']['agent_id_photo'].url) : prod}></img>
                        </div>
                    </div>
                    <div className="profile-level-up" style={{ 'flex-direction': 'column' }}>
                        <h2><strong>Your Products</strong></h2>
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