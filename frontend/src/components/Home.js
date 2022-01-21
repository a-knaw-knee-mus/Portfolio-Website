import React, { useEffect } from 'react'
import { useSetPage, useHomeContent } from './context/Context'
import Socials from './Socials'
import FadeIn from "react-fade-in"
import HomeCard from './HomeCard'
import HomeCSS from './css/HomeCard.module.css'

export default function Home() {
    const setPage = useSetPage()
    const homeContent = useHomeContent()

    useEffect(() => setPage("home"))

    return (
        <FadeIn delay={150} transitionDuration={700}>
            <HomeCard />
            <Socials />
            <div className={HomeCSS.pdfDiv}>
                <iframe id={HomeCSS.pdf} src={homeContent.resume} type="application/pdf" title="pdf"/>                           
            </div>
        </FadeIn>
    )
}
