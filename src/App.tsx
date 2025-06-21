import Generator from "./compenents/form";
import Qrcode from "./compenents/qrcode";
import { BrowserRouter as Routeur, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routeur>
      <Routes>
        {/* Redirection propre vers /acceuil */}
        <Route path="/" element={<Navigate to="/acceuil" replace />} />

        {/* Page d'accueil */}
        <Route path="/acceuil" element={<Generator />} />
        <Route path="/qrcode" element={<Qrcode />} /> 
        <Route path="/qrcode/*" element={<Qrcode />} /> 
      </Routes>
    </Routeur>
  );
}

export default App;
