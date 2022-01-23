import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const BackendContext = React.createContext()
const AdminContext = React.createContext()
const AdminContextToggle = React.createContext()
const ProjectsContext = React.createContext()
const UpdateProjectsContext = React.createContext()
const PageContext = React.createContext()
const UpdatePageContext = React.createContext()
const HomeContext = React.createContext()
const UpdateHomeContext = React.createContext()

export function useBackendUrl() {
    return useContext(BackendContext)
}

export function useAdmin() {
    return useContext(AdminContext)
}

export function useAdminToggle() {
    return useContext(AdminContextToggle)
}

export function useProjects() {
    return useContext(ProjectsContext)
}

export function useSetProjects() {
    return useContext(UpdateProjectsContext)
}

export function usePage() {
    return useContext(PageContext)
}

export function useSetPage() {
    return useContext(UpdatePageContext)
}

export function useHomeContent() {
    return useContext(HomeContext)
}

export function useUpdateHomeContent() {
    return useContext(UpdateHomeContext)
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
            <AdminContext.Provider value={isAdmin}>
                <AdminContextToggle.Provider value={adminToggle}>
                    <ProjectsContext.Provider value={projects}>
                        <UpdateProjectsContext.Provider value={updateProjects}>
                            <PageContext.Provider value={page}>
                                <UpdatePageContext.Provider value={setPage}>
                                    <HomeContext.Provider value={homeContent}>
                                        <UpdateHomeContext.Provider value={updateHomeContent}>
                                            {children}
                                        </UpdateHomeContext.Provider>
                                    </HomeContext.Provider>
                                </UpdatePageContext.Provider>
                            </PageContext.Provider>
                        </UpdateProjectsContext.Provider>
                    </ProjectsContext.Provider>
                </AdminContextToggle.Provider>
            </AdminContext.Provider>
        </BackendContext.Provider>
    )
}