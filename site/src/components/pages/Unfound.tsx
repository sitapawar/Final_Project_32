import React from "react"
import '../styles/Pages.css'


/**
 * Handles non existant endpoints 
 * @returns 
 */
export function Unfound() {
    return (
        <div className ={"background"}>
            <div className={'background-box'}>
                <h1>Error: page not found</h1>
                <br />
                <p>The page you're looking for does not exist</p>
            </div>
        </div>
    )
}

export default Unfound;