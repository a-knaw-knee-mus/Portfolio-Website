import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useBackendUrl } from "./context/Context";
import FadeIn from "react-fade-in";
import { Container } from "react-bootstrap";
import Loading from "./Loading";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

export default function Projects() {
  const backendUrl = useBackendUrl();
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const smallScreen = useMediaQuery({ query: "(max-width: 991px)" });

  const onStart = async () => {
    await axios.get(`${backendUrl}/getprojects`).then((res) => {
      setProjects(res.data);
    });
    setLoading(true);
  };

  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn delay={150} transitionDuration={700}>
      {loading ? (
        <FadeIn delay={150} transitionDuration={700}>
          <Container style={{ margin: "2% 0" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: !smallScreen ? "1.5rem" : "1rem",
                fontFamily: "Lato, sans-serif",
              }}
            >
              <em>
                Below are all of my significant projects, the link to find them
                and a demonstration if needed.
                <br />
                If you're admin (which is me) you can add, edit and delete these
                projects!
              </em>
            </p>
          </Container>
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project._id}
                id={project._id}
                title={project.title}
                description={project.description}
                gitLink={project.link}
                demoLink={project.demo}
                image={project.image}
              />
            );
          })}
        </FadeIn>
      ) : (
        <Loading />
      )}
    </FadeIn>
  );
}
