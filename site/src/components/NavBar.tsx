import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './styles/NavBar.css';

//Aria Labels 
export const TEXT_Home_accessible_name = 'Home'
export const TEXT_Ratty_accessible_name = 'Ratty'
export const TEXT_Vdub_accessible_name = 'Vdub'
export const TEXT_Andrews_accessible_name = 'Andrews'

export function NavBar() {
    return (
        <div className = "Heading">
            < div className="App-header">
                <p className = "Title">
                    BROWN YELP
                </p>
                <p className = "subtitle">
                    Menus and Ratings for Brown's Dining Halls
                </p>
            </div>
            <div className='Header'>
                <div className="PageLink" aria-label={TEXT_Home_accessible_name}>
                    <Link className = 'link' to="/home" >Home</Link>
                </div>
                <div className="PageLink" aria-label={TEXT_Ratty_accessible_name}>
                    <Link className = 'link' to="/ratty">Ratty</Link>
                </div>
                <div className="PageLink" aria-label={TEXT_Andrews_accessible_name}>
                    <Link className = 'link' to="/andrews">Andrews</Link>
                </div>
                <div className="PageLink" aria-label={TEXT_Vdub_accessible_name}>
                    <Link className = 'link' to="/vdub">Vdub</Link>
                </div>
            </div>
        </div>
            
        
    )
}

export default NavBar;
