import {Link} from "react-router-dom"
const Navbar = () => {
    return ( 
        <header className="wrapper">

        <nav>
            <ul>
                <li>
                    <h3 className="logo" href="">Gallery</h3>
                </li>
            </ul>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create</Link></li>
            </ul>
        </nav>

    </header>
     );
}
 
export default Navbar;