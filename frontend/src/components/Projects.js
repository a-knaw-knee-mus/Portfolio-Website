import React, { useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { useProjects, useSetPage } from "./context/Context"
import FadeIn from "react-fade-in"
import { Container } from "react-bootstrap"

export default function Projects() {
    const projects = useProjects()
    const setPage = useSetPage()

    useEffect(() => setPage("projects"))

    return (
        <FadeIn delay={150} transitionDuration={700}>
            <Container style={{margin: "2% 0"}}>
                <p style={{textAlign: "center", fontSize: "1.5rem", fontFamily: "Lato, sans-serif"}}><em>Below are all of my significant projects, the link to find them and a demonstration if needed.
                    <br/>If you're admin (which is me) you can add, edit and delete these projects!</em>
                </p>
            </Container>
            {projects != null && projects.map(project => {
                return (
                    <ProjectCard 
                        key={project._id}
                        id={project._id}
                        title={project.title}
                        description={project.description}
                        gitLink={project.link}
                        demoLink={project.demo}
                        image={project.image} 
                    />
                )       
            })}
        </FadeIn>
    )
}
