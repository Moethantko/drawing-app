import { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import SelectTool from "../ToolBar/ToolBar";

interface Line {
    points: [x: number, y: number];
}

interface Rectagle {
  x: number,
  y: number,
  width: number,
  height: number
}
  
const Canvas = () => {
    const [tool, setTool] = useState("pen");
    const [color, setColor] = useState("");

    const [lines, setLines] = useState<any>([]);
    const [annotations, setAnnotations] = useState<any>([]);
    const [newAnnotation, setNewAnnotation] = useState<any>([]);
    const [circles, setCircles] = useState<any>([]);
    const [newCircle, setNewCircle] = useState<any>({
      x: 0,
      y: 0,
      radius: 0,
    });

    

    const isDrawing = useRef(false);

    const onSelectTool = (tool: string) => {
      setTool(tool)
      console.log(tool)
    }

    const onSelectColor = (color: string) => {
      setColor(color)
      //console.log(color)
    }

    const onErase = () => {
      setLines([])
      setAnnotations([])
      setCircles([])
    }

    const handleMouseDown = (e: any) => {
        if (tool === "pen") {
          isDrawing.current = true;
          const pos = e.target.getStage().getPointerPosition();
          setLines([...lines, { tool, points: [pos.x, pos.y] }]);
        } else if (tool === "rect") {
          if (newAnnotation.length === 0) {
            const { x, y } = e.target.getStage().getPointerPosition();
            setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
          }
        } else if (tool === "circle") {
          isDrawing.current = true;
          const { x, y } = e.target.getStage().getPointerPosition();
          setNewCircle({ x, y, radius: 0 });
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
          if (newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = e.target.getStage().getPointerPosition();
            setNewAnnotation([
              {
                x: sx,
                y: sy,
                width: x - sx,
                height: y - sy,
                key: "0"
              }
            ]);
          }
        } else if (tool === "circle") {
          const { x, y } = e.target.getStage().getPointerPosition();
          const newRadius = Math.sqrt(
            Math.pow(newCircle.x - x, 2) + Math.pow(newCircle.y - y, 2)
          );

          setNewCircle({ ...newCircle, radius: newRadius });
        }
    };

    const handleMouseUp = (e: any) => {
        isDrawing.current = false;

        if (tool === "rect") {
          if (newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = e.target.getStage().getPointerPosition();
            const annotationToAdd = {
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              key: annotations.length + 1
            };
            annotations.push(annotationToAdd);
            setNewAnnotation([]);
            setAnnotations(annotations);
          }
        } else if (tool === "circle") {
          setCircles([...circles, newCircle]);
        }
    };

    const annotationsToDraw = [...annotations, ...newAnnotation];

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
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))
          }

          {annotationsToDraw.map(value => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                fill="transparent"
                stroke={color}
              />
            );
        })}

          {circles.map((circle: any, i: any) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fill={color}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas