import React, { useState } from 'react'
import { Stack, Button, ButtonGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAdmin, usePage } from "./context/Context"
import AdminModal from './modals/AdminModal'
import ProjectModal from './modals/ProjectModal'
import HomeModal from './modals/HomeModal'

const style = {
    textDecoration: "none",
    color: "white"
}

export default function Header() {
    const [showAdminModal, setShowAdminModal] = useState(false)
    const [showHomeModal, setShowHomeModal] = useState(false)
    const [showProjectModal, setShowProjectModal] = useState(false)
    const {isAdmin,adminToggle} = useAdmin()
    const {page} = usePage()

    return (
        <>
        <Stack style={{borderBottom: "1px solid #CCC", paddingBottom: "3px"}} direction="horizontal" gap="3">
            <h2 style={{fontFamily: "Lato, sans-serif", fontWeight: "700"}} className='me-auto'>Muhammad Mehdi Ali</h2>
            <ButtonGroup>
                <Button variant={page === "home" ? "dark" : "secondary"}><Link style={style} to="/">Home</Link></Button>
                <Button variant={page === "projects" ? "dark" : "secondary"}><Link style={style} to="/projects">Projects</Link></Button>
                <Button variant={page === "contact" ? "dark" : "secondary"}><Link style={style} to="/contact">Contact</Link></Button>
            </ButtonGroup>
            {!isAdmin ? 
                <Button variant="primary" onClick={() => setShowAdminModal(true)}>Admin Sign-In</Button>
            : 
                <>
                <Button variant="success" onClick={() => setShowHomeModal(true)}>Edit Home</Button>
                <Button variant="success" onClick={() => setShowProjectModal(true)}>Add Project</Button>
                <Button variant="primary" onClick={() => adminToggle(false)}>Sign Out</Button>
                </>}
            
        </Stack>

        <HomeModal 
            show={showHomeModal}
            handleClose={() => setShowHomeModal(false)}
        />

        <ProjectModal
            show={showProjectModal}
            handleClose={() => setShowProjectModal(false)}
        />
        
        <AdminModal
            show={showAdminModal}
            handleClose={() => setShowAdminModal(false)}
        />
        </>
    )
}
