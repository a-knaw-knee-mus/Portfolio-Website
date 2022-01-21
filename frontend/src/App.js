import Container from "react-bootstrap/Container"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Contact from "./components/Contact"
import Header from "./components/Header"
import Home from "./components/Home"
import Projects from "./components/Projects"
import { Context } from "./components/context/Context"

function App() {
  return (
    <Context>
      <Container className="mt-4">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </Router>
      </Container>
    </Context>
  )
}

export default App;
