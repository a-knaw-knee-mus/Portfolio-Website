import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const BackendContext = React.createContext()
const AdminContext = React.createContext()
const ProjectsContext = React.createContext()
const PageContext = React.createContext()
const HomeContext = React.createContext()

export function useBackendUrl() {
    return useContext(BackendContext)
}

export function useAdmin() {
    return useContext(AdminContext)
}

export function useProjects() {
    return useContext(ProjectsContext)
}

export function usePage() {
    return useContext(PageContext)
}

export function useHomeContent() {
    return useContext(HomeContext)
}

export function Context({children}) {
    const backendUrl = "https://mma-website-backend.herokuapp.com"
    const [isAdmin, setIsAdmin] = useState(false)
    const [projects, setProjects] = useState()
    const [homeContent, setHomeContent] = useState({})
    const [page, setPage] = useState()

    useEffect(() => {
        updateProjects()
        updateHomeContent()
    }, [])

    function adminToggle(value) {
        setIsAdmin(currentValue => 
            typeof value === "boolean" ? value : !currentValue
        )
    }

    async function updateProjects() {
        await axios.get(`${backendUrl}/getprojects`).then(res => {
            setProjects(res.data)
        })
    }

    async function updateHomeContent() {
        await axios.get(`${backendUrl}/gethomecontent`).then(res => {
            setHomeContent(res.data)
        })
    }

    return (
        <BackendContext.Provider value={backendUrl}>
            <AdminContext.Provider value={{isAdmin, adminToggle}}>
                <ProjectsContext.Provider value={{projects, updateProjects}}>
                    <PageContext.Provider value={{page, setPage}}>
                        <HomeContext.Provider value={{homeContent, updateHomeContent}}>
                            {children}
                        </HomeContext.Provider>
                    </PageContext.Provider>
                </ProjectsContext.Provider>
            </AdminContext.Provider>
        </BackendContext.Provider>
    )
}