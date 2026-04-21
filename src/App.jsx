import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Proposal from "./components/Proposal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Proposal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;