import './Intermediate.css';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/NavbarLogged';

function Intermediate() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="page">
                <div className="button-container">
                    <center>
                        <div
                            className="button"
                            onClick={() => navigate("/login")}
                        >
                            Existing Donor? Login
                        </div>
                        <div className="button" onClick={() => navigate("/signup")}>New Donor? Sign Up</div>
                    </center>
                </div>
            </div>
        </>
    )
}

export default Intermediate;