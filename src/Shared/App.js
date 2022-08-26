import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./Components/Header/AppHeader";
import Acounting from "../Modules/Accounting/Acounting/Acounting";
import Reception from "../Modules/Reception/Reception";
import Xray from "../Modules/X-Ray/Xray";
import Home from "../Modules/Home/Home";
import Print from "../Modules/Reception/Components/ModalAcc/Print/Print"
function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Acounting" element={<Acounting />} />
          <Route path="/Reception" element={<Reception />} />
          <Route path="/Xray" element={<Xray/>}/>
          <Route path="/Reception/Print" element={<Print/>} />
          {/* <Route path="/Home" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
