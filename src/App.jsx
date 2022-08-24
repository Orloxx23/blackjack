import { Routes, Route } from "react-router-dom";
import { Shop, Match, Login } from "./pages";

function App() {
  let token = "";
  token = localStorage.getItem('token')
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <Match /> : <Login />} />
        <Route path="/tienda" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
