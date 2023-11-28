import React from "react";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const imagesrc = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.1.2031671276.1700929955&semt=ais";
    const navigate = useNavigate();
    return (
        <>
            <div style={{"backgroundColor":"black", "padding":"2% 0"}}>
                <div>
                    <span style={{"verticalAlign" : "middle"}}>
                        <img src={imagesrc} style={{"height":"15vh"}}></img>
                    </span>
                    <span style={{"verticalAlign":"middle"}}>
                        <button style={{"margin":"0 5%", "color":"red", "padding":"1%", "fontSize":"120%", "backgroundColor":"transparent", "color":"white", "border":"1px solid white", "borderRadius":"5px"}} onClick={()=>navigate("/login")}>LOGIN</button>
                        <button style={{"color":"red", "padding":"1%", "fontSize":"120%", "backgroundColor":"transparent", "color":"white", "border":"1px solid white", "borderRadius":"5px"}} onClick={()=>navigate("/signup")}>SIGNUP</button>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Navbar;