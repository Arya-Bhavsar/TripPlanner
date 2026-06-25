import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Dashboard from "./components/Dashboard";
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/guide" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
