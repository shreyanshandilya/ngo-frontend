import './Landing.css';
import { useNavigate } from "react-router-dom";
import rest from '../images/rest.jpg'
import prod from '../images/prod.jpg';

function Landing() {
    const navigate = useNavigate();

    const title = "Recycling Used Things, Creating Better Lives";
    const description = "Welcome to our NGO site where we collect, restore and donate used products. We believe in sustainable living and improving lives by recycling.";
    const imagesrc = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg&ga=GA1.1.2031671276.1700929955&semt=ais";

    return (
        <div className="landingpage">
            <div className="content">
                <img src={imagesrc} className="logo"></img>
                <h1>{title}</h1>
                <p>{description}</p>
                <br />
                <h2>When giving doubles up as saving the environment</h2>
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
            <div className='content-row'>
                <img className='round-img' src={rest}></img>
                <div className='content-inside'>
                    <h2>Restoring, to Give Old Things New Lives</h2>
                    <p>Our skilled team of experts work tirelessly to repair and restore every single product received. Thus, creating items that can be used anew.</p>
                    <div className='button-con'>
                        <div
                            className="agent"
                            onClick={() => navigate("/agent")}
                            style={{ "color": "black" }}
                        >
                            Be a part, become an Agent
                        </div>
                    </div>
                </div>
            </div>
            <div className='content-row'>
                <div className='content-inside'>
                    <h2>View Items Available for Collection</h2>
                    <p>Our listed items are repaired, usable products ready for a new home.
                        <br />
                        Browse the accessible list and select the items you need.
                        <br />
                        This is a perfect way to save costs and promote responsible consumption, whilst reducing waste.
                        <br />
                        From furniture to utensils, stationery to clothes, your contribution can make a real impact.
                        <br />
                        Everyone deserves a second chance, so does your old stuff.</p>
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

            <div className="content">
                <h2>Leaderboard</h2>
            </div>
            <div className="content">
                <h2>About Us</h2>

            </div>

        </div>
    )
}

export default Landing;