import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Create from './Create';
import Details from './Details';
function App() {

    return (
<div className = "App" >

    <div className="content">
     
    <Router>
    <Navbar/> 
        <Routes>
       
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/create" element={ <Create/>}/>

             <Route exact path="/:title/:id" element={<Details/>} /> 
          
        </Routes>
        
        </Router>
    </div>
        </div>
    );
}

export default App;