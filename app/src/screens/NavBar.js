import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import SimpleMenu from './SimpleMenu'

function NavBar (props) {

    
    return(
        
            <nav className="nav-wrapper light-blue">
                <div >
                    
                    <Link to="/" className="left brand-logo"><h5>Citi Eats</h5></Link>
                    <ul className="right">
                        <li  style={{paddingBottom:'5%'}}><Link to='#'><SimpleMenu/></Link></li>
                    </ul>
                    
                </div>
            </nav>  
    )
}

export default NavBar;