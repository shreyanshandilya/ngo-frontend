import './Intermediate.css';
import { useNavigate } from "react-router-dom";

function Intermediate() {
    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="content">
                <center>
                    <div className="button" onClick={()=>navigate("/login")}>Existing User? Login</div>
                    <div className="button" onClick={()=>navigate("/signup")}>New User? Sign Up</div>
                </center>
            </div>
        </div>
    )
}

export default Intermediate;