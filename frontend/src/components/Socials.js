import React from "react";
import { Card } from "react-bootstrap";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useMediaQuery } from "react-responsive";

export default function Socials() {
  const smallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  const socialStyle = {
    backgroundColor: "rgb(231, 231, 231)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: !smallScreen ? "3% 40%" : "3% 32%",
    padding: "2%",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    textAlign: "center",
  };

  return (
    <Card style={socialStyle}>
      <a
        rel="noreferrer"
        target="_blank"
        href="https://github.com/a-knaw-knee-mus"
      >
        <GitHubIcon sx={{ color: "#14191e" }} fontSize="large" />
      </a>
      <a
        rel="noreferrer"
        target="_blank"
        href="https://www.linkedin.com/in/muhammad-mehdi-ali-8bb5491b6/"
      >
        <LinkedInIcon sx={{ color: "#14191e" }} fontSize="large" />
      </a>
      <a rel="noreferrer" target="_blank" href="mailto:m30ali@ryerson.ca">
        <EmailIcon sx={{ color: "#14191e" }} fontSize="large" />
      </a>
    </Card>
  );
}
