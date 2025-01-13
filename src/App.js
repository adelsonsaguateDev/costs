import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Contacto from "./components/pages/Contacto";
import Empresa from "./components/pages/Empresa";
import NovoProjecto from "./components/pages/NovoProjecto";
import Projectos from "./components/pages/Projectos";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer
 from "./components/layout/Footer";
function App() {
  return (
    <Router>
    <Navbar/>
    

    {/* Um <Routes> examina seus <Route>s filhos e
    renderiza o primeiro que corresponde ao URL actual. */}
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projectos" element={<Projectos />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/novoprojecto" element={<NovoProjecto />} />
          </Routes>
        </Container>
          <Footer/>
  </Router>
  );
}

export default App;
