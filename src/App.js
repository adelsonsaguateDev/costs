import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Contacto from "./components/pages/Contacto";
import Empresa from "./components/pages/Empresa";
import NovoProjecto from "./components/pages/NovoProjecto";

import Container from "./components/layout/Container";
function App() {
  return (
    <Router>
    <nav>
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/empresa"> Empresa</Link>
          </li>
          <li>
            <Link to="/contacto"> Contacto</Link>
          </li>
          <li>
            <Link to="/novoprojecto"> Novo projecto</Link>
          </li>
        </ul>
      </nav>
    

    {/* Um <Routes> examina seus <Route>s filhos e
    renderiza o primeiro que corresponde ao URL actual. */}
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/novoprojecto" element={<NovoProjecto />} />
          </Routes>
        </Container>
          <p>Footer</p>
  </Router>
  );
}

export default App;
