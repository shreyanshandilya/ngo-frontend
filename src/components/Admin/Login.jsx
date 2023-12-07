import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Login() {

    const navigate = useNavigate();

    const [key, setKey] = useState('');

    const [loading, setLoading] = useState(false);

    const Authenticate = async(e) => {
        e.preventDefault();
        setLoading(true);
        let data = {
            "admin_key" : "iamadmin"
        }
        console.log(JSON.stringify(data));
        await fetch("https://ngo-api.onrender.com/admin/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json"
            }
          })
            .then(response => { 
                response.json()
            })
            .then(json => {
                console.log(json)
                if(json) {
                    localStorage.setItem("token", json.token);
                    localStorage.setItem("role", json.role);
                    navigate("/admin/dashboard");
                    setLoading(false);
                }
                else {
                    setLoading(false);
                    alert("Please retry");
                }
            });
    }

    return (
        <>
            <label for="admin">ADMIN KEY</label>
            <input type="text" value={key} onChange={(e)=>setKey(e.target.value)} name="admin"></input>
            <button onClick={Authenticate}>LOGIN</button>
            {loading ? <h1>Authenticating....</h1> : <></>}
        </>
    )
}

export default Login;