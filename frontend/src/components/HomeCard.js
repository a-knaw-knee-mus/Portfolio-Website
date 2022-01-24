import React from 'react';
import { Card } from 'react-bootstrap'
import HomeCSS from './css/HomeCard.module.css'

export default function HomeCard({pfp, description}) {
    return <Card id={HomeCSS.cardContainer}>
        <img className={HomeCSS.pfp} src={pfp} alt="profile"/>
        <div className={HomeCSS.description}>
            <p style={{fontFamily: "Lato, sans-serif", fontWeight: "400"}}>{description}</p>
        </div>
    </Card>;
}
