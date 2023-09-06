import { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Circle, KonvaNodeComponent, StageProps } from "react-konva";
import ToolBar from "../ToolBar/ToolBar";
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuidv4 } from 'uuid';

interface Rectagle {
  x: number,
  y: number,
  width: number,
  height: number
}
  
const Canvas = () => {
    const [tool, setTool] = useState<string>("pen")
    const [color, setColor] = useState<string>("#FF0000")
    const stageRef = useRef<any>(null)
    const isDrawing = useRef<boolean>(false)

    const [lines, setLines] = useState<any>([])

    const [annotations, setAnnotations] = useState<any>([])
    const [newAnnotation, setNewAnnotation] = useState<any>([])

    const [circles, setCircles] = useState<any>([])
    const [newCircle, setNewCircle] = useState<any>({
      x: 0,
      y: 0,
      radius: 0,
    })

    const handleSelectTool = (tool: string) => {
      setTool(tool)
    }

    const handleSelectColor = (color: string) => {
      setColor(color)
    }

    const handleErase = () => {
      setLines([])
      setAnnotations([])
      setCircles([])
    }

    const handleDownload = () => {
      const dataURL = stageRef.current.toDataURL()

      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'drawing.png'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        switch (tool) {

          case 'pen':
            isDrawing.current = true
            const pos = e.target.getStage().getPointerPosition()
            setLines([...lines, { tool, color, points: [pos.x, pos.y] }])
            break;

          case 'rect':
            if (newAnnotation.length === 0) {
              const { x, y } = e.target.getStage().getPointerPosition()
              const id = uuidv4()
              
              setNewAnnotation([{ x, y, width: 0, height: 0, key: id, color }])
            }
            break;

          case 'circle':
            const { x, y } = e.target.getStage().getPointerPosition()
            setNewCircle({ x, y, radius: 0, color })
            break;

          default:
            // pass

        }

    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {

      switch (tool) {

        case 'pen':
          /* Skip if user is not drawing */
          if (!isDrawing.current) {
            return;
          }

          const stage = e.target.getStage();
          const point = stage.getPointerPosition();
          let lastLine = lines[lines.length - 1];
    
          lastLine.points = lastLine.points.concat([point.x, point.y]);
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
          break;
        case 'rect':
          if (newAnnotation.length === 1) {
            const sx = newAnnotation[0].x
            const sy = newAnnotation[0].y

            const { x, y } = e.target.getStage().getPointerPosition()
            const id = uuidv4()

            setNewAnnotation([
              {
                x: sx,
                y: sy,
                width: x - sx,
                height: y - sy,
                key: id,
                color
              }
            ]);
          }
          break;
        case 'circle':
          const { x, y } = e.target.getStage().getPointerPosition()

          const newRadius = Math.sqrt(
            Math.pow(x - newCircle.x, 2) + Math.pow(y - newCircle.y, 2)
          ) - 100;

          setNewCircle({ ...newCircle, radius: newRadius })
          break;
        default:
          // pass

      }
    };

    const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {

      switch (tool) {
        case 'pen':
          isDrawing.current = false
          break
        case 'rect':
          if (newAnnotation.length === 1) {
            const sx = newAnnotation[0].x
            const sy = newAnnotation[0].y

            const { x, y } = e.target.getStage().getPointerPosition()
            
            const annotationToAdd = {
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              key: annotations.length + 1,
              color
            }

            annotations.push(annotationToAdd)
            setNewAnnotation([])
            setAnnotations(annotations)
          }
          break
        case 'circle':
          setCircles([...circles, newCircle])
          break

      }
    };

    const annotationsToDraw = [...annotations, ...newAnnotation]

  return (
    <div>
        <ToolBar 
          onSelectTool={handleSelectTool} 
          onSelectColor={handleSelectColor}
          onErase={handleErase}
          onDownload={handleDownload}
         />
        <Stage
          ref={stageRef}
          className='mx-6 mt-6 shadow-inner shadow-2xl shadow-slate-400 rounded-lg'
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}>
        <Layer>
          {
              lines.map((line: any, i: any) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={5}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={"source-over"}
                />
              ))
          }

          {annotationsToDraw.map((rect: any) => {
            return (
              <Rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="transparent"
                stroke={rect.color}
              />
            );
          })}

          {circles.map((circle: any, i: any) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fillEnabled={true}
              opacity={1}
              stroke={circle.color}
              strokeWidth={2}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas