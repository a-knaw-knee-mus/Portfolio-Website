import React, { useState } from 'react'
import { Card, Button } from "react-bootstrap"
import axios from 'axios'
import { useProjects, useAdmin, useBackendUrl } from './context/Context'
import CardCSS from './css/ProjectCard.module.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkIcon from '@mui/icons-material/Link'
import ProjectModal from './modals/ProjectModal'

export default function ProjectCard({
    id,
    title,
    description,
    gitLink,
    demoLink,
    image
}) {
    const backendUrl = useBackendUrl()
    const {updateProjects} = useProjects()
    const {isAdmin} = useAdmin()
    const [showProjectModal, setShowProjectModal] = useState(false)

    const deleteProject = async () => {
        if(window.confirm('Are you sure you want to delete this project?')) {
            await axios.post(`${backendUrl}/deleteproject`, {id: id, apiKey: process.env.REACT_APP_API_KEY})
            await updateProjects()
        }
    }

    return (
        <>
        <Card id={CardCSS.gridContainer}>
            <div className={CardCSS.name}>
                {title}
            </div>
            <div className={CardCSS.description}>
                {description}
            </div>
            {demoLink !== "" &&
                <div className={CardCSS.demo}><em>Demonstration: </em><a rel="noreferrer" target="_blank" href={demoLink}><LinkIcon sx={{color: "#14191e"}} fontSize="large"/></a></div>
            }
            <div className={CardCSS.link}><a rel="noreferrer" target="_blank" href={gitLink}><GitHubIcon sx={{color: "#14191e"}} fontSize="large" /></a></div>
            <div className={CardCSS.image} ><img className={CardCSS.picture} src={image} alt="project thumbnail"/></div>
            {isAdmin && <>
                <Button className={CardCSS.editButton} onClick={() => setShowProjectModal(true)} variant="success">Edit</Button> 
                <Button className={CardCSS.deleteButton} onClick={() => deleteProject()} variant="danger">Delete</Button>
                </>
            }
        </Card>

        <ProjectModal 
            show={showProjectModal} 
            handleClose={() => setShowProjectModal(false)} 
            id={id} 
            titlePlaceholder={title} 
            descPlaceholder={description} 
            demoPlaceholder={demoLink} 
            linkPlaceholder={gitLink} 
            imagePlaceholder={image}
            edit={true}
        />
        </>
        
    )
}
