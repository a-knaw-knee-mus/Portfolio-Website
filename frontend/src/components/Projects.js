import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useBackendUrl } from "./context/Context";
import FadeIn from "react-fade-in";
import { Container } from "react-bootstrap";
import Loading from "./Loading";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Projects() {
  const backendUrl = useBackendUrl();
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(false);
  const smallScreen = useMediaQuery({ query: "(max-width: 991px)" });

  const renderProjects = async () => {
    await axios.get(`${backendUrl}/getprojects`).then((res) => {
      setProjects(res.data);
    });
    setLoading(true);
  };

  const switchItems = async (firstId, secondId) => {
    const data = {
      firstId: firstId,
      secondId: secondId,
      apiKey: process.env.REACT_APP_API_KEY,
    };
    await axios.post(`${backendUrl}/switchprojects`, data);
    await renderProjects();
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    switchItems(projects[source.index]._id, projects[destination.index]._id);
  };

  useEffect(() => {
    renderProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <FadeIn delay={150} transitionDuration={500}>
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="projectsList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {projects.map((project, index) => {
                    return (
                      <ProjectCard
                        index={index}
                        key={project._id}
                        id={project._id}
                        title={project.title}
                        description={project.description}
                        gitLink={project.link}
                        demoLink={project.demo}
                        image={project.image}
                        renderProjects={renderProjects}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </FadeIn>
      ) : (
        <FadeIn delay={150} transitionDuration={500}>
          <Loading />
        </FadeIn>
      )}
    </>
  );
}
