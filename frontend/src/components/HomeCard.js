import React from 'react';
import { useHomeContent } from './context/Context';
import { Card } from 'react-bootstrap'
import HomeCSS from './css/HomeCard.module.css'

export default function HomeCard() {
    const homeContent = useHomeContent()

    return <Card id={HomeCSS.cardContainer}>
        <img className={HomeCSS.pfp} src={homeContent.profilePic} alt="profile"/>
        <div className={HomeCSS.description}>
            <p style={{fontFamily: "Lato, sans-serif", fontWeight: "400"}}>{homeContent.intro}</p>
        </div>
    </Card>;
}
