import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Hero from "./Pages/Hero";
import Authenticate from "./Pages/Authenticate";
import UserContextProvider from "./Context/User";
function App() {
  return (
    <div>
      <Router>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
