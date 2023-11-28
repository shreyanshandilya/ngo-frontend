import {useEffect, useState} from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom"; 
import NavbarLogged from "../components/NavbarLogged";
import NavbarLogout from "../components/NavbarLogout";
import { Navbar } from "flowbite-react";

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '40vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain'
}


function Card(item) {
    const route = `/view/${item["_id"]}`
    return (
    <div style={{"borderTop":"1px solid black", "borderBottom":"1px solid black", "margin":"2% 0", "textAlign":"left", "padding":"2%", "backgroundColor":"white"}}>
        <p style={{"fontSize":"150%"}}><strong>{item["product_title"]}</strong></p>
        <p style={{"fontSize":"120%"}}><strong>Category</strong> {item.product_category}</p>
        <Slide>
         {item.product_pictures_before.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
        <p><strong>Description </strong><br></br>{item.product_description_before}</p>
        <p><strong>Defects </strong>{item.product_defects_before}</p>
        <p><strong>Area of Donation </strong> {item.product_area_of_donation}</p>
        <center>
            <Link to ={route} style={{"textDecoration":"none"}}><p style={{"width":"50vw", "border":"1px solid black", "fontWeight":"bold", "cursor":"pointer", "padding":"1%", "color":"black"}}>VIEW</p></Link>
        </center>
    </div>
    )
}

function App() {
    const [isExpired, setExpired] = useState(true);
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false);
    let o = []
    useEffect(() => {
        setLoading(true)
        fetch('https://ngo-api.onrender.com/product/')
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                for(let i=0; i<data.length; i++) {
                    o.push(Card(data[i]))
                    setList(o);
                }
            });
            const token = localStorage.getItem("token")
            if(token) {
                const JWT = token;
                const jwtPayload = JSON.parse(window.atob(JWT.split('.')[1]))
                setExpired(Date.now() >= jwtPayload.exp * 1000);
            }
    },[]);    
    return (
        <>
        {!isExpired ? <NavbarLogged/> : <></>}
        {isExpired ? <NavbarLogout/> : <></>}
        {loading ? <h1>Loading</h1> : <></>}
        <div style={{"padding":"5%", "backgroundColor":"lightgray"}}>
            {list}
        </div>
        </>
    )
}

export default App;