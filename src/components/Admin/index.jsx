import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';

function Page() {

    const CardDonor = (donor) => {
        return (
            <div style={{ "backgroundColor": "white", "color": "black" }}>
                <h1>{donor["donor_name"]}</h1>
                <h4>Mobile </h4>
                <h4>{donor["donor_mob_number"]}</h4>
                <h4>Address </h4>
                <h4>{donor["donor_address"]}</h4>
                <h4>Email </h4>
                <h4>{donor["donor_email"]}</h4>
                <h4>ID Type </h4>
                <h4>{donor["donor_id_type"]}</h4>
                <h4>ID Number </h4>
                <h4>{donor["donor_id_number"]}</h4>
                <h4>Pan Number </h4>
                <h4>{donor["donor_pan_number"]}</h4>
                <h4>Anonymous </h4>
                <h4>{donor["donor_anonymous"] ? <>Yes</> : <>No</>}</h4><br></br>
            </div>
        )
    }

    const CardAgent = (agent) => {
        return (
            <div style={{ "backgroundColor": "white", "color": "black" }}>
                <h1>{agent["agent_name"]}</h1>
                <h4>Agent Operation Area</h4>
                <h4>{agent["agent_operation_area"]}</h4>
                <h4>Agent Active</h4>
                <h4>{agent["agent_active"] ? "Yes" : "No"}</h4>
                <h4>Mobile </h4>
                <h4>{agent["agent_mob_number"]}</h4>
                <h4>Address </h4>
                <h4>{agent["agent_address"]}</h4>
                <h4>Email </h4>
                <h4>{agent["agent_email"]}</h4>
                <h4>ID Type </h4>
                <h4>{agent["agent_id_type"]}</h4>
                <h4>ID Number </h4>
                <h4>{agent["agent_aadhar_number"]}</h4>
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
        if(agentLoaded) return setAgentLoaded(false);
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

    return (
        <>
            <button onClick={view_donor}>
                VIEW DONORS
            </button>
            <br></br>
            {donorLoaded ? <>
                {donorLoading ? <h1>Fetching all donor data....</h1> :
                    <>
                        <h1>Anonymous</h1>
                        {anonDonorData}
                        <h1>Non-Anonymous</h1>
                        {nanonDonorData}
                    </>}
            </> : <></>}
            <br></br>
            <button onClick={view_agent}>
                VIEW AGENT
            </button>
            {agentLoaded ? <>
            {agentLoading ? <h1>Retrieving all agent details..</h1> :
                <>
                    {agentData}
                </>
            }
            </> :
            <></>}
        </>
    )
}

export default Page;