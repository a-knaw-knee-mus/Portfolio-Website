import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import Socials from "./Socials";
import FadeIn from "react-fade-in";

const titleStyle = {
  fontSize: "1.5rem",
};

const contactStyle = {
  backgroundColor: "rgb(231, 231, 231)",
  margin: "3% 7% 3%",
  padding: "2%",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  fontFamily: "Lato, sans-serif",
  fontWeight: "700",
};

export default function Contact() {
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(
      "service_kacxihj",
      "template_a2edhn9",
      e.target,
      process.env.REACT_APP_EMAILJS_USERID
    );
    e.target.reset();
    alert(
      "Thank you for your message. I'll try to respond as soon as possible!"
    );
  }

  return (
    <FadeIn delay={150} transitionDuration={700}>
      <Card style={contactStyle}>
        <Form onSubmit={sendEmail}>
          <Form.Group className="mb-2" controlId="name" style={titleStyle}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              autoComplete="nope"
              type="text"
              name="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="subject" style={titleStyle}>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              name="subject"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="message" style={titleStyle}>
            <Form.Label>Message</Form.Label>
            <Form.Control
              autoComplete="off"
              placeholder="Include your email if you would like a reply"
              as="textarea"
              type="text"
              name="message"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
      <Socials />
    </FadeIn>
  );
}
