import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import  axios from 'axios';

const Details = () => {
    
        const {id}=useParams();
      
        const [gallery,setGallery]=useState([]);
        const [found,setFound]=useState(false);
        const[loading,setLoading]=useState(true);
        useEffect(()=>{
            axios.get('https://message-anon.000webhostapp.com/api/gallery/'+id).then(res=>{
                setLoading(true)
        setGallery(res.data.data);
        setLoading(false);
            }).catch(error=>{
       console.log(error);     
       if(error.response.status===404){
        setLoading(false);
        setFound(true);
       }
            })
        },[id]);

 

    return (   
        <section className="details-container">
    <div className="details">
        {found && <div>Not Found</div>}
        {loading && <div>Loading......</div>}
        <div>
            <img src={gallery.image} alt="" />
        </div>
        <div className="content">
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
        </div>
    </div>

</section>
 );
}
 
export default Details;