import './Landing.css';
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    const title = "Recycling Used Things, Creating Better Lives";
    const description = "Welcome to our NGO site where we collect, restore and donate used products. We believe in sustainable living and improving lives by recycling.";
    const imagesrc = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.1.2031671276.1700929955&semt=ais";

    return (
        <div className="landingpage">
            <div className="content">
            <div className="text">
                <img src={imagesrc} className="logo"></img>
                <h1>{title}</h1>
                <h3>{description}</h3>
                <div className="view" onClick={()=>navigate("/view")}>VIEW</div>
                <div className="donate"  onClick={()=>navigate("/donate")}>DONATE</div>
                <br></br>
                <br></br>
                <div className="about">ABOUT<br></br> &<br></br> LEADERBOARD</div>
                <br></br>
                <br></br>
                <div className="agent" onClick={() => navigate("/agent")} style={{"color":"black"}}>Agent? Click Here</div>
            </div>
            </div>
        </div>
    )
}

export default Landing;