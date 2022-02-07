import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useAdmin, useBackendUrl } from "./context/Context";
import CardCSS from "./css/ProjectCard.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ProjectModal from "./modals/ProjectModal";
import { Draggable } from "react-beautiful-dnd";

export default function ProjectCard({
  index,
  id,
  title,
  description,
  gitLink,
  demoLink,
  image,
  renderProjects,
}) {
  const backendUrl = useBackendUrl();
  const { isAdmin } = useAdmin();
  const [showProjectModal, setShowProjectModal] = useState(false);

  const deleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await axios.post(`${backendUrl}/deleteproject`, {
        id: id,
        apiKey: process.env.REACT_APP_API_KEY,
      });
      renderProjects();
    }
  };

  return (
    <>
      <Draggable isDragDisabled={!isAdmin} draggableId={id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card id={CardCSS.gridContainer} ref={provided.innerRef}>
              <div className={CardCSS.name}>{title}</div>
              <div className={CardCSS.link}>
                <a rel="noreferrer" target="_blank" href={gitLink}>
                  <GitHubIcon sx={{ color: "#14191e" }} fontSize="large" />
                </a>
              </div>
              <div className={CardCSS.image}>
                <img
                  className={CardCSS.picture}
                  src={image}
                  alt="project thumbnail"
                />
              </div>
              <div className={CardCSS.description}>{description}</div>
              {demoLink !== "" && (
                <div className={CardCSS.demo}>
                  <em>Demonstration: </em>
                  <a rel="noreferrer" target="_blank" href={demoLink}>
                    <YouTubeIcon sx={{ color: "#14191e" }} fontSize="large" />
                  </a>
                </div>
              )}
              {isAdmin && (
                <>
                  <Button
                    className={CardCSS.editButton}
                    onClick={() => setShowProjectModal(true)}
                    variant="success"
                  >
                    Edit
                  </Button>
                  <Button
                    className={CardCSS.deleteButton}
                    onClick={() => deleteProject()}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </>
              )}
            </Card>
          </div>
        )}
      </Draggable>

      <ProjectModal
        show={showProjectModal}
        handleClose={() => setShowProjectModal(false)}
        id={id}
        titlePlaceholder={title}
        descPlaceholder={description}
        demoPlaceholder={demoLink}
        linkPlaceholder={gitLink}
        imagePlaceholder={image}
        edit={true}
        renderProjects={renderProjects}
      />
    </>
  );
}
