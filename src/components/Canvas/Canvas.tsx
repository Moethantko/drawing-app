import { useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

interface Line {
    points: [x: number, y: number];
  }
  
const Canvas = () => {

    const [tool, setTool] = useState("pen");
    const [lines, setLines] = useState<any>([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e: any) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: any) => {
        // Skip if user is not drawing
        if (!isDrawing.current) {
        return;
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

  return (
    <div>
        <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Welcome to STEM Sims Drawing App" x={5} y={30} />
          {lines.map((line: any, i: any) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas