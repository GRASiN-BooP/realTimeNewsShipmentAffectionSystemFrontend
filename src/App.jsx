import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard";
import Hero from "./Pages/Hero";
import Authenticate from "./Pages/Authenticate";
import UserContextProvider from "./Context/User";

function App() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Custom success toast style
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
            },
          },
          // Custom error toast style
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
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
