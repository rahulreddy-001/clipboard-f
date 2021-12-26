import React from "react";
import "./App.css";
import TextArea from "./TextArea";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${require("./images/bg-01.jpg")})` }}
        >
          <div className="wrap-login100">
            <span className="login100-form-title ">Clipboard</span>
            <Routes>
              <Route
                exact
                path={`${window.location.pathname}`}
                element={<TextArea paramId={window.location.pathname} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
