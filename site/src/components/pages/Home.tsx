import React from "react";
import '../styles/Pages.css'


export function Home() {
    return (
        <div className ={"background"}>
            <div className={'background-box'}>
                <h1>Home</h1>
                <br />
                <p>Hello! Welcome to Yelp@Brown. The goal of this project was to give students more of a voice 
                    about what they eat on a daily basis. Through this website, we feel that each student's opinions can be heard
                    and acknowledged. Eventually, these ratings will be presented to Brown Dining, so rate honestly. In order to submit
                    a rating, please click on the dining hall of your choice.</p> 
                <p>There you will be able to rate each food item with a whole
                    number from 0-5. Thanks for your help and lets change Brown Dining for the better.</p>
                <br></br>
            </div>
        </div>
    )
}

export default Home;