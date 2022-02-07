import React, { useRef, useState } from 'react'
import { Form, Modal, Button } from "react-bootstrap"
import axios from 'axios'
import { useBackendUrl } from "../context/Context"

export default function HomeModal({
    show, 
    handleClose
}) {
    const introRef = useRef()
    const resumeRef = useRef()
    const [pfpSelected, setPfpSelected] = useState("")

    const backendUrl = useBackendUrl()
    const [homeContent, setHomeContent] = useState(async () => {
        await axios.get(`${backendUrl}/gethomecontent`).then(res => {
            setHomeContent(res.data)
        })
    })
    const introPlaceholder = homeContent.intro
    const resumePlaceholder= homeContent.resume
    const homeId = homeContent._id

    const handleSubmit = async (e) => {
        e.preventDefault()

        let pfpUrl = ""
        if(pfpSelected === "") {
            pfpUrl = homeContent.pfp
        } else {
            const formData = new FormData()
            formData.append("file", pfpSelected)
            formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_KEY)
            const res = await axios.post("https://api.cloudinary.com/v1_1/dekkpovmw/image/upload", formData)
            pfpUrl = res.data.secure_url
        }

        let resumeUrl = resumeRef.current.value
        if(!resumeUrl.endsWith("#view=fitH")) {
            resumeUrl = resumeRef.current.value + "#view=fitH"
        }

        const projectJSON = {
            intro: introRef.current.value,
            pfp: pfpUrl,
            resume: resumeUrl,
            id: homeId,
            apiKey: process.env.REACT_APP_API_KEY
        }

        await axios.post(`${backendUrl}/edithomecontent`, projectJSON)
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Home Page Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="intro">
                        <Form.Label>Enter Intro Content</Form.Label>
                        <Form.Control defaultValue={introPlaceholder} ref={introRef} type="text" as="textarea" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="pfp">
                        <Form.Label>Attach Your Profile Picture</Form.Label>
                        <input 
                            className='mx-4' 
                            type="file"
                            onChange={e => setPfpSelected(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="intro">
                        <Form.Label>Enter Resume Link</Form.Label>
                        <Form.Control defaultValue={resumePlaceholder} ref={resumeRef} type="text" required/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}