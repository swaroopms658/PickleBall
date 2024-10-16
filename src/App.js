import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register"; // Import the Register component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />{" "}
          {/* Main page with registration form */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
