import { useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import Canvas from "./screens/Canvas/Canvas";
import NavBar from "./components/NavBar/NavBar";

const App = () => {

  return (
    <>
      <NavBar />
      <Canvas />
    </>
  );
};

export default App;
