import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthVerify } from "../../helper/JWTVerify";
import Navbar from '../../components/NavbarLogged'
import './Show.css'

function Page() {

    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const CardDonor = (donor) => {
        return (
            <div className="productCardHolder">
                <h4><strong>{donor["donor_name"]}</strong> {donor["donor_mob_number"]}</h4>
                <div className="productCard">
                    <div className="productDetailsDiv">
                        <p>Address: <strong>{donor["donor_address"]}</strong></p>
                        <p>Email: <strong>{donor["donor_email"]}</strong></p>
                        <p>{donor["donor_id_type"]} Number: <strong>{donor["donor_id_number"]}</strong></p>
                        <p>Pan Number: <strong>{donor["donor_pan_number"]}</strong></p>
                        <p>Anonymous: <strong>{donor["donor_anonymous"] ? <>Yes</> : <>No</>}</strong></p>
                    </div>
                </div>
            </div>
        )
    }

    const verifyAgent = (agent_id) => {
        setLoading(true)
        const token = localStorage.getItem("token")
        let data = {
            agent_id: agent_id
        }
        fetch(`https://ngo-api.onrender.com/agent/verification`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.message == "verified succesfully") {
                    alert("Agent Verified")
                    window.location.reload()
                }
            });
        setLoading(false)
    }

    const CardAgent = (agent) => {
        const agent_id = agent["_id"];
        return (
            <div className="productCardHolder">
                <h4><strong>{agent["agent_name"]}</strong> {agent["agent_mob_number"]}</h4>
                <div className="productCard">
                    <div className="productDetailsDiv">
                        <p>Area: <strong>{agent["agent_operation_area"]}</strong></p>
                        <p>Active: <strong>{agent["agent_active"] ? "Yes" : "No"}</strong></p>
                        <p>Address: <strong>{agent["agent_address"] ? "Yes" : "No"}</strong></p>
                        <p>Email: <strong>{agent["agent_email"] ? "Yes" : "No"}</strong></p>
                        <p>ID Type: <strong>{agent["agent_id_type"]}</strong></p>
                        <p>Aadhar Number: <strong>{agent["agent_aadhar_number"]}</strong></p>
                        {agent["agent_verified"] ? <strong><p style={{ color: "green" }}>Agent Verified</p></strong> : <> <button onClick={() => verifyAgent(agent_id)} disabled={loading}>Verify Agent</button> </>}
                    </div>
                </div>
            </div>
        )
    }

    const [donorLoading, setDonorLoading] = useState(false);
    const [donorLoaded, setDonorLoaded] = useState(false);

    const [agentData, setAgentData] = useState([]);
    const [agentLoading, setLoadingAgent] = useState(false);
    const [agentLoaded, setAgentLoaded] = useState(false);

    const [anonDonorData, setAnonDonorData] = useState([]);
    const [nanonDonorData, setnAnonDonorData] = useState([]);

    const view_agent = () => {
        if (agentLoaded) return setAgentLoaded(false);
        setAgentLoaded(true);
        setLoadingAgent(true);
        let demo = [];
        fetch('https://ngo-api.onrender.com/agent/getTopAgent')
            .then(response => response.json())
            .then(async (data) => {
                demo = data.map(x => CardAgent(x));
                setAgentData(demo);
                setLoadingAgent(false);
            });
    }

    const view_donor = () => {
        if (donorLoaded) return setDonorLoaded(false);
        setDonorLoaded(true);
        setDonorLoading(true);
        let anonymous = [];
        let non_anonymous = [];
        fetch('https://ngo-api.onrender.com/donor/getTopDonor')
            .then(res => res.json())
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["donor_anonymous"]) anonymous.push(CardDonor(data[i]));
                    else non_anonymous.push(CardDonor(data[i]))
                }
                setAnonDonorData(anonymous);
                setnAnonDonorData(non_anonymous);
                setDonorLoading(false);
            })
    }

    useEffect(() => {
        if (AuthVerify(localStorage.getItem("token")) && localStorage.getItem("role") == "admin") {
        }
        else {
            navigate("/admin/login");
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role")
        navigate("/admin/login");
    }

    return (
        <>
            <Navbar />
            <div className='showPage'>
                <div className='showColumn'>
                    <button onClick={view_donor}>
                        View Donors
                    </button>
                    {donorLoaded ? <>
                        {donorLoading ? <h1>Fetching all donor data....</h1> :
                            <>
                                <h1>Anonymous</h1>
                                {anonDonorData}
                                <h1>Non-Anonymous</h1>
                                {nanonDonorData}
                            </>}
                    </> : <></>}
                </div>
                <div className="showColumn">
                    <button onClick={view_agent}>
                        View Agents
                    </button>
                    {agentLoaded ? <>
                        {agentLoading ? <h1>Retrieving all agent details..</h1> :
                            <>
                                {agentData}
                            </>
                        }
                    </> :
                        <></>}
                </div>
            </div>
        </>
    )
}

export default Page;