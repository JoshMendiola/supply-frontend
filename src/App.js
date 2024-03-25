import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FleetManagerDashboard from "./pages/FleetManagerDashboard.js";
import MapComponent from "./components/MapComponent.js";
import Home from "./pages/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import {AuthProvider} from "./context/AuthContext.js";
import GetAllVehicles from "./components/GetAllVehicles";
import Sidebar from "./components/Sidebar";
function App() {
  const [count, setCount] = useState(0)

  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path ="/" element={<Home/>}> </Route>
            <Route path ="sidebar" element={<Sidebar/>}> </Route>
            <Route path ="fleetdashboard" element={<FleetManagerDashboard/>}> </Route>
            <Route path ="mapcomponent" element={<MapComponent/>}> </Route>
            <Route path ="login" element={<Login/>}> </Route>
            <Route path ="register" element={<Register/>}> </Route>
            <Route path ="getallvehicles" element={<GetAllVehicles/>}> </Route>
          </Routes>
        </Router>
      </AuthProvider>
  )
}

export default App;