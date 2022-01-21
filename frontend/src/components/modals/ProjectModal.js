import React, { useRef, useState } from 'react'
import { Form, Modal, Button } from "react-bootstrap"
import axios from 'axios'
import { useSetProjects } from "../context/Context"

export default function ProjectModal({
    show, 
    handleClose, 
    id, 
    titlePlaceholder, 
    descPlaceholder, 
    linkPlaceholder, 
    demoPlaceholder, 
    edit, 
    image
}) {
    const titleRef = useRef()
    const descRef = useRef()
    const linkRef = useRef()
    const demoRef = useRef()
    const setProjects = useSetProjects()

    const [imageSelected, setSelectedImage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let imageUrl = ""
        if(edit && imageSelected === "") {
            imageUrl = image
        } else {
            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_KEY)
            const res = await axios.post("https://api.cloudinary.com/v1_1/dekkpovmw/image/upload", formData)
            imageUrl = res.data.secure_url
        }

        const projectJSON = {
            title: titleRef.current.value,
            description: descRef.current.value,
            link: linkRef.current.value,
            demo: demoRef.current.value,
            image: imageUrl,
            id: id,
            apiKey: process.env.REACT_APP_API_KEY
        }
        
        edit ? await axios.post('https://mma-website-backend.herokuapp.com/editproject', projectJSON)
             : await axios.post('https://mma-website-backend.herokuapp.com/addproject', projectJSON)
        
        await setProjects()
        handleClose()
    }

    return (
        <Modal onShow={() => {titleRef.current.focus()}} show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{edit ? `Edit ${titlePlaceholder}` : "Add A New Project"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Enter Title</Form.Label>
                        <Form.Control defaultValue={titlePlaceholder} ref={titleRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Enter Description</Form.Label>
                        <Form.Control defaultValue={descPlaceholder} as="textarea" ref={descRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="link">
                        <Form.Label>Enter Link</Form.Label>
                        <Form.Control defaultValue={linkPlaceholder} ref={linkRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="demo">
                        <Form.Label>Enter Demo Link (optional)</Form.Label>
                        <Form.Control defaultValue={demoPlaceholder} ref={demoRef} type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Enter Picture/Gif</Form.Label>
                        <input 
                            className='mx-4' 
                            type="file" required={!edit}
                            onChange={e => {
                                setSelectedImage(e.target.files[0])
                            }} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

