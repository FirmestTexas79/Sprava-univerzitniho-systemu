import React from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import Registration from './Registration';
import Rozvrh from './Rozvrh';
import VyberPredmetu from './VyberPredmetu';
import OsobniUdaje from './OsobniUdaje';
import UcitelDashboard from './UcitelDashboard';
import PlanHodin from './Plan hodin';
import SpravaKurzu from './SpravaKurzu';
import ZaznamZnamek from './ZaznamZnamek';
import VyukoveMaterialy from './VyukovyMaterialy';
import OsobniUdajeUcitele from './OsobniUdajeUcitele';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/rozvrh" element={<Rozvrh />} />
            <Route path="/vyber-predmetu" element={<VyberPredmetu />} />
            <Route path="/osobni-udaje" element={<OsobniUdaje />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ucitel-dashboard" element={<UcitelDashboard />} />
            <Route path="/plan-hodin" element={<PlanHodin />} />
            <Route path="/sprava-kurzu" element={<SpravaKurzu />} />
            <Route path="/zaznam-znamek" element={<ZaznamZnamek />} />
            <Route path="/vyukove-materialy" element={<VyukoveMaterialy />} />
            <Route path="/osobni-udaje-ucitele" element={<OsobniUdajeUcitele />} />
            
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
