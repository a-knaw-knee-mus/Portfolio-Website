import React, { useContext, useState } from 'react'

const BackendContext = React.createContext()
const AdminContext = React.createContext()

export function useBackendUrl() {
    return useContext(BackendContext)
}

export function useAdmin() {
    return useContext(AdminContext)
}

export function Context({children}) {
    const backendUrl = "https://mma-website-backend.herokuapp.com"
    const [isAdmin, setIsAdmin] = useState(false)

    function adminToggle(value) {
        setIsAdmin(currentValue => 
            typeof value === "boolean" ? value : !currentValue
        )
    }

    return (
        <BackendContext.Provider value={backendUrl}>
            <AdminContext.Provider value={{isAdmin, adminToggle}}>
                {children}
            </AdminContext.Provider>
        </BackendContext.Provider>
    )
}