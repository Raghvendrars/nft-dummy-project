import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ViewProduct from "./Pages/ViewProduct";
import Order from "./Pages/Order";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Order />} />
          {/* <Route exact path="/" element={<Home />} /> */}

          <Route exact path="/view/:id" element={<ViewProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
