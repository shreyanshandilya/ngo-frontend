import {useEffect, useState} from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from "react-router-dom"; 

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '40vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain'
}


function Card(item) {
    return (
    <div style={{"borderTop":"1px solid black", "borderBottom":"1px solid black", "margin":"2% 0", "textAlign":"left", "padding":"2%"}}>
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
            <Link to="/" style={{"textDecoration":"none"}}><p style={{"width":"50vw", "border":"1px solid black", "fontWeight":"bold", "cursor":"pointer", "padding":"1%", "color":"black"}}>VIEW</p></Link>
        </center>
    </div>
    )
}

function App() {
    const [list, setList] = useState([])
    let o = []
    useEffect(() => {
        fetch('https://ngo-api.onrender.com/product/')
            .then(response => response.json())
            .then(data => {
                for(let i=0; i<data.length; i++) {
                    o.push(Card(data[i]))
                    setList(o);
                }
            });
    },[]);    
    return (
        <>
        {list}
        </>
    )
}

export default App;