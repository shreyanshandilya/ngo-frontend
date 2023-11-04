import Navbar from '../components/Navbar';
import './ProfileStyles.css';

const donor = {
    "donor": {
        "_id": "6538e10c8d962b7ec14ab00d",
        "donor_name": "Testing webpage",
        "donor_mob_number": "0000000000",
        "donor_address": "webpage",
        "donor_email": "webpage@gmail.com",
        "donor_id_type": "Aadhar Card",
        "donor_id_number": "0",
        "donor_pan_number": "00000000",
        "donor_anonymous": true,
        "donor_products": [],
        "__v": 0
    },
    "iat": 1698774959,
    "exp": 1698861359
}

function Profile() {
    return (
        <center>
            <Navbar/>
            <div className="profile" style={{"backgroundColor":"white"}}>
                <div className="header">
                    <div className="image">
                        <img src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw"></img>
                    </div>
                    <div className="info">
                        <h2>{donor["donor"]["donor_name"]}</h2>
                        <h3>{donor["donor"]["donor_mob_number"]}</h3>
                        <h4>{donor["donor"]["donor_email"]}</h4>
                    </div> 
                </div>
            </div>
            <div className="personalDetails" style={{"backgroundColor":"white"}}>
                <div>
                    <span className="title">Name</span>
                    <span className="answer">{donor["donor"]["donor_name"]}</span>
                </div>
                <div>
                    <span className="title">Mobile Number</span>
                    <span className="answer">{donor["donor"]["donor_mob_number"]}</span>
                </div>
                <div>
                    <span className="title">Email</span>
                    <span className="answer">{donor["donor"]["donor_email"]}</span>
                </div>
                <div>
                    <span className="title">Address</span>
                    <span className="answer">{donor["donor"]["donor_address"]}</span>
                </div>
                <div>
                    <span className="title">ID Type</span>
                    <span className="answer">{donor["donor"]["donor_id_type"]}</span>
                </div>
                <div>
                    <span className="title">{donor["donor"]["donor_id_type"]} Number</span>
                    <span className="answer">{donor["donor"]["donor_id_number"]}</span>
                </div>
                <div>
                    <span className="title">Donor Anonymous</span>
                    <span className="answer">{donor["donor"]["donor_anonymous"] ? "Yes" : "No"}</span>
                </div>
            </div>
        </center>
    )
}

export default Profile;