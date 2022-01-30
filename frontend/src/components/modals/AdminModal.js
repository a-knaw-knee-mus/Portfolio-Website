import React, { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useAdmin } from "../context/Context";

export default function AdminModal({ show, handleClose }) {
  const pswdRef = useRef();
  const { adminToggle } = useAdmin();

  function handleSubmit(e) {
    e.preventDefault();
    if (pswdRef.current.value === process.env.REACT_APP_ADMIN_PASSWORD)
      adminToggle(true);
    else alert("Incorrect password");
    handleClose();
  }

  return (
    <Modal
      onShow={() => pswdRef.current.focus()}
      show={show}
      onHide={handleClose}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Sign-in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control ref={pswdRef} type="password" required />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
