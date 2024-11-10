
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Rules from "./pages/Rules";
import Header from "./components/Header";

const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:difficulty" element={<Game />} />
      <Route path="/rules" element={<Rules />} />
    </Routes>
  </div>
);

export default App;
