import './Landing.css';
import { useNavigate } from "react-router-dom";
import rest from '../images/rest.jpg'
import prod from '../images/prod.jpg';
import don from '../images/don.jpg'
import Navbar from './NavbarLogged.jsx'

function Landing() {
    const navigate = useNavigate();

    const title = "Recycling Used Things, Creating Better Lives";
    const description = "Welcome to our NGO site where we collect, restore and donate used products. We believe in sustainable living and improving lives by recycling.";
    return (
        <>
            <Navbar />
            <div className="landingpage">
                <div className="content-row" style={{ 'margin-top': '5vh' }}>
                    <img className='round-img' src={don}></img>
                    <div className='content-inside'>
                        <h1><strong>{title}</strong></h1>
                        <p>{description}</p>
                        <h2><strong>When giving doubles up as saving the environment</strong></h2>
                        <p>With each donation, you not just help someone in need, but also contribute towards saving the planet. Let’s work together towards a greener future.</p>
                        <div className='button-con'>
                            <div
                                className="donate"
                                onClick={() => navigate("/donate")}
                            >
                                Donate Now
                            </div>
                        </div>
                    </div>
                </div>

                <div className='content-row-rev'>
                    <div className='content-inside'>
                        <h2><strong>View Items Available for Collection</strong></h2>
                        <ul style={{ 'textAlign': 'left' }}>
                            <li>Our listed items are repaired, usable products ready for a new home.
                            </li>
                            <li>Browse the accessible list and select the items you need.
                            </li>
                            <li>This is a perfect way to save costs and promote responsible consumption, whilst reducing waste.
                            </li>
                            <li>From furniture to utensils, stationery to clothes, your contribution can make a real impact.
                            </li>
                            <li>Everyone deserves a second chance, so does your old stuff.
                            </li>
                        </ul>
                        <div className='button-con'>
                            <div
                                className="view"
                                onClick={() => navigate("/view")}
                            >
                                View listed products
                            </div>
                        </div>
                    </div>
                    <img className='round-img' src={prod}></img>
                </div>

                <div className='content-row'>
                    <img className='round-img' src={rest}></img>
                    <div className='content-inside'>
                        <h2><strong>Restoring, to Give Old Things New Lives</strong></h2>
                        <p>Our skilled team of experts work tirelessly to repair and restore every single product received.<br /> Thus, creating items that can be used anew.</p>
                        <div className='button-con'>
                            <div
                                className="agent donate"
                                onClick={() => navigate("/agent/signup")}
                                style={{ 'textDecoration': 'none', "color": "white" }}
                            >
                                Be a part, become an Agent
                            </div>
                        </div>
                        <div className='button-con'>
                            <div
                                className="agent"
                                onClick={() => navigate("/agent/login")}
                                style={{ "color": "black", 'fontSize': '0.9em' }}
                            >
                                Already an agent, Login
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <h2><strong>Leaderboard</strong></h2>
                    <div className='content-row' style={{ "background": "none", "max-width": "800px" }}>
                        <div className='content-inside'>
                            <h4 style={{ 'textAlign': 'left' }}>Top Donors</h4>
                            <ol style={{ 'textAlign': 'left' }}>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                            </ol>
                        </div>
                        <div className='content-inside'>
                            <h4 style={{ 'textAlign': 'left' }}>Top Agents</h4>
                            <ol style={{ 'textAlign': 'left' }}>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                                <li>Divyansh Gupta</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <h2><strong>About Us</strong></h2>

                </div>
            </div>
        </>
    )
}

export default Landing;