import { Route, Routes } from "react-router-dom"
import Canvas from "./screens/Canvas/Canvas";
import NavBar from "./components/NavBar/NavBar";
import Home from "./screens/Home/Home";

const App = () => {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas/:drawingId" element={<Canvas />} />
      </Routes>
    </div>
  );
};

export default App;
