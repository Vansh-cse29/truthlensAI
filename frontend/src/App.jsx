import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FakeNews from "./pages/FakeNews";
import WebsiteChecker from "./pages/WebsiteChecker";
import PhishingChecker from "./pages/PhishingChecker";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fake-news" element={<FakeNews />} />
        <Route path="/website-checker" element={<WebsiteChecker />} />
        <Route path="/phishing-checker" element={<PhishingChecker />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
