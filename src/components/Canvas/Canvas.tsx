import { useRef, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import SelectTool from "../ToolBar/ToolBar";

interface Line {
    points: [x: number, y: number];
  }
  
const Canvas = () => {
    const [tool, setTool] = useState("pen");
    const [color, setColor] = useState("");

    const [lines, setLines] = useState<any>([]);
    const [rectangles, setRectangles] = useState<any>([]);

    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });

    const isDrawing = useRef(false);

    const onSelectTool = (tool: string) => {
      setTool(tool)
      //console.log(tool)
    }

    const onSelectColor = (color: string) => {
      setColor(color)
      //console.log(color)
    }

    const onErase = () => {
      setLines([])
      setRectangles([])
    }

    const handleMouseDown = (e: any) => {
        if (tool === "pen") {
          isDrawing.current = true;
          const pos = e.target.getStage().getPointerPosition();
          setLines([...lines, { points: [pos.x, pos.y] }]);
        } else if (tool === "rect") {
          isDrawing.current = true;
          setStartPos({ x: e.evt.clientX, y: e.evt.clientY });
          setEndPos({ x: e.evt.clientX, y: e.evt.clientY });
        }
    };

    const handleMouseMove = (e: any) => {
        // Skip if user is not drawing
        if (!isDrawing.current) {
        return;
        }

        if (tool === "pen") {
          const stage = e.target.getStage();
          const point = stage.getPointerPosition();
          let lastLine = lines[lines.length - 1];
          // add point
          lastLine.points = lastLine.points.concat([point.x, point.y]);

          // replace last
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
        } else if (tool === "rect") {
          setEndPos({ x: e.evt.clientX, y: e.evt.clientY });
        }
    };

    const handleMouseUp = () => {
        isDrawing.current = false;

        if (tool === "rect") {
          const newRect = {
            x: Math.min(startPos.x, endPos.x),
            y: Math.min(startPos.y, endPos.y),
            width: Math.abs(startPos.x - endPos.x),
            height: Math.abs(startPos.y - endPos.y),
          };
          setRectangles([...rectangles, newRect]);
        }
    };

  return (
    <div>
        <SelectTool 
          onSelectTool={onSelectTool} 
          onSelectColor={onSelectColor}
          onErase={onErase}
         />
        <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {
            tool === "pen" ? (
              lines.map((line: any, i: any) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={color}
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    tool === "pen" ? "source-over" : tool === "eraser" ? "source-over" : "source-in"
                  }
                />
              ))
            ) : (
              rectangles.map((rect: any, i: any) => (
                <Rect
                  key={i}
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  fill="blue"
                />
              ))
            )
          }
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas