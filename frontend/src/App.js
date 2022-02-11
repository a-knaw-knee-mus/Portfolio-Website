import Container from "react-bootstrap/Container"
import Contact from "./components/Contact"
import Header from "./components/Header"
import Home from "./components/Home"
import Projects from "./components/Projects"
import { useState } from "react"

function App() {
  const [page, setPage] = useState("home")

  return (
      // single page design
      <Container className="mt-4">
          <Header page={page} setPage={setPage} />
          {page === "home" && <Home />}
          {page === "projects" && <Projects />}
          {page === "contact" && <Contact />}
      </Container>
  )
}

export default App;
