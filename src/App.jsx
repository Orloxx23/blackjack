import { Routes, Route } from "react-router-dom";
import { Match } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Match />} />
      </Routes>
    </div>
  );
}

export default App;
