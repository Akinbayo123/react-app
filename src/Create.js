import React from 'react';

import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { useState } from "react";
const Create = () => {
    const [gallery,setGallery]=useState({
        name:'',
        description:'',
        image:"",
      })
      const [loading,setLoading]=useState(false);
      const[inputErrors,setInputError]=useState({});
      const navigate=useNavigate();
      const [success,setSuccess]=useState("");
    
    const getPost=(data)=>{
    setLoading(true)
    axios.post('https://message-anon.000webhostapp.com/api/gallery',data).then(res=>{
    console.log(res.data.data.message);
    setLoading(false);
    if(res.data.data.message){
    setSuccess(res.data.data.message);
    }
    setTimeout(() => {
      navigate('/');
    }, 2000);
    
    }).catch(error=>{
      if(error.response){
        setLoading(false);
        if(error.response.status===422){
          setLoading(false);
    setInputError(error.response.data.errors);
        }
      }
    });
    }
    
    
      const handleInput=(e)=>{
        e.persist();
        setGallery({
            ...gallery,[e.target.name]:e.target.value
        });
        
      }
    
    
  const handleFileChange = (e) => {
    setGallery({
      ...gallery,
      image: e.target.files[0], 
    });
  };
      const saveGallery=(e)=>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', gallery.name);
    formData.append('description', gallery.description);
    formData.append('image', gallery.image);

    console.log(formData);

    getPost(formData);
   
      }
    


    return (   
     
<div className="container">
          <form onSubmit={saveGallery} className="create">
            <h3>Create</h3>
            {success && <div className="success">{success}</div>}
            <div className="input-field">
                <label for="">Title</label>
                <input type="text" 
                name="name"
                value={gallery.name}
                onChange={handleInput}
               />
                <span className="error">{inputErrors.name}</span> 
            </div>
            <div className="input-field">
                <label for="">Description</label>
                <textarea name="description" id="" cols="30" rows="10"   
                
                value={gallery.description}
                onChange={handleInput} ></textarea>
                 <span className="error">{inputErrors.description}</span> 
            </div>
            <div className="input-field">
                <label for="">Image</label>
                <input type="file"
                 name="image"
                
                 onChange={handleFileChange}
                />
                <span className="error">{inputErrors.image}</span> 
                </div>
            {!loading && <button>Submit</button>}
                 {loading && <button disabled>Loading.....</button>}
           
        </form>
    </div>

 );
}
 
export default Create;