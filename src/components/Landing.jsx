import './Landing.css';
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    return (
        <div className="landingpage">
            <div className="content">
                <div className="view">VIEW</div>
                <div className="donate"  onClick={()=>navigate("/donate")}>DONATE</div>
                <br></br>
                <br></br>
                <div className="about">ABOUT<br></br> &<br></br> LEADERBOARD</div>
            </div>
        </div>
    )
}

export default Landing;