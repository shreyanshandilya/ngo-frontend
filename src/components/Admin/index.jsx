import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';

function Page() {

    const [visible, setVisible] = useState(false);

    const CardDonor = (donor) => {
        return (
            <div style={{"backgroundColor":"white", "color":"black"}}>
                <h1>{donor["donor_name"]}</h1>
                <h4>Mobile </h4>
                <h4>{donor["donor_mob_number"]}</h4><br></br>
                <h3>Address </h3>
                <h3>{donor["donor_address"]}</h3><br></br>
                <h3>Email </h3>
                <h3>{donor["donor_email"]}</h3><br></br>
                <h3>ID Type </h3>
                <h3>{donor["donor_id_type"]}</h3><br></br>
                <h3>ID Number </h3>
                <h3>{donor["donor_id_number"]}</h3><br></br>
                <h3>Pan Number </h3>
                <h3>{donor["donor_pan_number"]}</h3><br></br>
                <h3>Anonymous </h3>
                <h3>{donor["donor_anonymous"] ? <>Yes</> : <>No</>}</h3><br></br>
            </div>
        )
    }

    const CardAgent = (donor) => {
        return (
            <div style={{"backgroundColor":"white", "color":"black"}}>
                <h1>{donor["donor_name"]}</h1>
                <h4>Mobile </h4>
                <h4>{donor["donor_mob_number"]}</h4><br></br>
                <h3>Address </h3>
                <h3>{donor["donor_address"]}</h3><br></br>
                <h3>Email </h3>
                <h3>{donor["donor_email"]}</h3><br></br>
                <h3>ID Type </h3>
                <h3>{donor["donor_id_type"]}</h3><br></br>
                <h3>ID Number </h3>
                <h3>{donor["donor_id_number"]}</h3><br></br>
                <h3>Pan Number </h3>
                <h3>{donor["donor_pan_number"]}</h3><br></br>
                <h3>Anonymous </h3>
                <h3>{donor["donor_anonymous"] ? <>Yes</> : <>No</>}</h3><br></br>
            </div>
        )
    }

    const [donor, setDonor] = useState([]);
    const [loading, setLoading] = useState(false);

    const [agent, setAgent] = useState([]);

    const [anonymousV, setanonymousV] = useState(false);
    const [non_anonymousV, set_non_anonymousV] = useState(false);

    const [anon, setAnon] = useState([]);
    const [nanon, setnAnon] = useState([]);


    let non_anonymous = [];

    let anonymous = [];

    const view_anonymous = () => {
        for (var i = 0; i < donor.length; i++) {
            if (donor[i]["donor_anonymous"]) anonymous.push(CardDonor(donor[i]))
        }
        setanonymousV(!anonymousV);
        setAnon(anonymous);
    }



    const view_non_anonymous = () => {
        for (var i = 0; i < donor.length; i++) {
            if (!donor[i]["donor_anonymous"]) non_anonymous.push((CardAgent(donor[i])))
        }
        set_non_anonymousV(!non_anonymousV);
        setnAnon(non_anonymous);
    }

    useEffect(() => {
        setLoading(true)
        fetch('https://ngo-api.onrender.com/donor/getTopDonor')
            .then(response => response.json())
            .then(async (data) => {
                setDonor(data);
                setLoading(false);
            });
        fetch('https://ngo-api.onrender.com/agent/getTopAgent')
            .then(response => response.json())
            .then(async (data) => {
                setAgent(data);
                setLoading(false);
            });
    }, []);

    return (
        <>
            {!donor.length ? <h1>LOADING..</h1> : <>
                <button onClick={view_anonymous}>
                    VIEW ANONYMOUS DONORS
                </button>
                <br></br>
                {anonymousV ? <>{anon}</> : <></>}
                <br></br>
                <button onClick={view_non_anonymous}>
                    VIEW NON ANONYMOUS DONORS
                </button>
                <br></br>
                {non_anonymousV ? <>{nanon}</> : <></>}
            </>
            }
        </>
    )
}

export default Page;