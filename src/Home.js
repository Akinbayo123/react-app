import React from 'react';
import Image from './img/thumb-2.png'; // Adjust the path based on your project structure
import {Link,useHistory} from 'react-router-dom'
import axios from "axios";
import { useState,useEffect } from "react";
const Home = () => {
    const[loading,setLoading]=useState(true);
    const [gallery,setGallery]=useState([]);
    const[error,setError]=useState(false);
    const getRequest= async ()=>{
       await axios.get('https://message-anon.000webhostapp.com/api/gallery').then(res=>{
            setLoading(true)
    setGallery(res.data.data);
    setLoading(false);
        }).catch(error=>{
            console.log(error.code);
            if(error.code==="ERR_NETWORK"){
                setLoading(false);
                setError(true);
            }
            if(error.response){
                if(error.response.status===404){
                    setLoading(false);
                    setError(true);
                }
            }
           
        })
    }
    
useEffect(()=>{
   getRequest()
},[]);


const TruncateText = ({ text, maxLength }) => {
    const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)} ....` : text;      
    return <p>{truncatedText}</p>;
  };


const Gallery=gallery.map((gallery)=>{
    return(  <div className="card" key={gallery.id}>
    <div className="image">
        <img src={gallery.image} alt="" />
    </div>
    <div className="card-content">
        <h2>{gallery.name}</h2>
        <TruncateText text={gallery.description} maxLength={30} />
    </div>
    <div className="button">
        <Link to={`/${gallery.name}/${gallery.id}`} className="">View</Link>
    </div>
</div>
)});
   
    return ( 

        <div id="card-container">
              {error && <div className="error">Could not fetch</div>}
   {loading && <div>Loading.....</div>}
       {Gallery}
        </div>
    );
};
 
export default Home;
