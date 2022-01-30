import React, { useState } from "react";
import { Stack, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useAdmin } from "./context/Context";
import AdminModal from "./modals/AdminModal";
import ProjectModal from "./modals/ProjectModal";
import HomeModal from "./modals/HomeModal";
import { useMediaQuery } from "react-responsive";

export default function Header({ page, setPage }) {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showHomeModal, setShowHomeModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { isAdmin, adminToggle } = useAdmin();

  const smallScreen = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <>
      <Stack
        style={{ borderBottom: "1px solid #CCC", paddingBottom: "3px" }}
        direction="horizontal"
        gap="3"
      >
        <h2
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: "700",
            fontSize: smallScreen && "1.8rem",
          }}
          className="me-auto"
        >
          {!smallScreen ? "Muhammad Mehdi Ali" : "Muhammad"}
        </h2>
        {!smallScreen ? (
          <ButtonGroup>
            <Button
              variant={page === "home" ? "dark" : "secondary"}
              onClick={() => setPage("home")}
            >
              Home
            </Button>
            <Button
              variant={page === "projects" ? "dark" : "secondary"}
              onClick={() => setPage("projects")}
            >
              Projects
            </Button>
            <Button
              variant={page === "contact" ? "dark" : "secondary"}
              onClick={() => setPage("contact")}
            >
              Contact
            </Button>
          </ButtonGroup>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Pages
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setPage("home")}>
                Home
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPage("projects")}>
                Projects
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPage("contact")}>
                Contact
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!isAdmin ? (
          <Button variant="primary" onClick={() => setShowAdminModal(true)}>
            Admin
          </Button>
        ) : (
          <>
            <Button variant="success" onClick={() => setShowHomeModal(true)}>
              Edit Home
            </Button>
            <Button variant="success" onClick={() => setShowProjectModal(true)}>
              Add Project
            </Button>
            <Button variant="primary" onClick={() => adminToggle(false)}>
              Sign Out
            </Button>
          </>
        )}
      </Stack>

      {isAdmin && (
        <>
          <HomeModal
            show={showHomeModal}
            handleClose={() => setShowHomeModal(false)}
          />

          <ProjectModal
            show={showProjectModal}
            handleClose={() => setShowProjectModal(false)}
          />
        </>
      )}

      <AdminModal
        show={showAdminModal}
        handleClose={() => setShowAdminModal(false)}
      />
    </>
  );
}
