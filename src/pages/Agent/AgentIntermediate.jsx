import '../Intermediate.css';
import { useNavigate } from "react-router-dom";

function AgentIntermediate() {
    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="button-container">
                <center>
                    <div className="button" onClick={() => navigate("/agent/login")}>Existing Agent? Login</div>
                    <div className="button" onClick={() => navigate("/agent/signup")}>New Agent? Sign Up</div>
                </center>
            </div>
        </div>
    )
}

export default AgentIntermediate;