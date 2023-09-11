import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle, Image } from "react-konva";
import ToolBar from "../../components/ToolBar/ToolBar";
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuidv4 } from 'uuid';
import { LineInterface, RectagleInterface, CircleInterface, DrawingTool, DrawingColor } from '../../Types/types'
  
const Canvas = () => {
    const CANVAS_WIDTH = 1920

    const [tool, setTool] = useState<DrawingTool>(DrawingTool.Pen)
    const [toolSize, setToolSize] = useState<string>('sm')
    const [color, setColor] = useState<DrawingColor>(DrawingColor.Black)

    const stageRef = useRef<any>(null)
    const [uploadedImage, setUploadedImgage] = useState<HTMLImageElement>(null)

    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const [lines, setLines] = useState<LineInterface[]>([])

    const [rectangles, setRectangles] = useState<RectagleInterface[]>([])
    const [newRectangle, setNewRectangle] = useState<RectagleInterface[]>([])

    const [circles, setCircles] = useState<CircleInterface[]>([])
    const [newCircle, setNewCircle] = useState<CircleInterface[]>([])

    /* change the drawing tool */
    const handleSelectTool = (tool: DrawingTool): void => {
      setTool(tool)
    }

    const handleSelectToolSize = (size: string): void => {
      setToolSize(size)
    }

    /* change the color of drawing tool */
    const handleSelectColor = (color: DrawingColor): void => {
      setColor(color)
    }

    /* erase all the drawings by emptying the all arrays and setting image to null */
    const handleErase = (): void => {
      setLines([])
      setRectangles([])
      setCircles([])
      setUploadedImgage(null)
    }

    /* upload the existing png image file and replace all current drawings on canvas */
    const handleUploadImg = (img: string): void => {
      //first, erase everything currently on canvas before uploading a new img
      handleErase()

      const image = new window.Image()
      image.src = img
      image.onload = () => {
        setUploadedImgage(image)
      };
    }

    /* download the current drawing as png file */
    const handleDownload = (drawingTitle: string): void => {
      const dataURL = stageRef.current.toDataURL()

      const link = document.createElement('a')
      link.href = dataURL
      link.download = `${drawingTitle}.png`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    /* handle mouse down event depending on current drawing tool */
    const handleMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
      setIsDrawing(true)
      
      const { x, y } = e.target.getStage().getPointerPosition() // current coordinates (x,y) of mouse pointer
      const id = uuidv4() // id generated for each drawing

        switch (tool) {
          case DrawingTool.Pen:
            const newPenLine: LineInterface = {
              id, tool, color, points: [x, y]
            }
            setLines([...lines, newPenLine])
            break

          case DrawingTool.Brush:
            const newBrushLine: LineInterface = {
              id, tool, color, points: [x, y]
            }
            setLines([...lines, newBrushLine])
            break
          
          case DrawingTool.Eraser:
            const newEraserLine: LineInterface = {
              id, tool, color, points: [x, y]
            }
            setLines([...lines, newEraserLine])
            break

          case DrawingTool.Rectangle:
            if (newRectangle.length === 0) {
              const rectangle: RectagleInterface = { id, x, y, width: 0, height: 0, color }
              setNewRectangle([rectangle])
            }
            break

          case DrawingTool.Cricle:
            if (newCircle.length === 0) {
              const circle: CircleInterface = { id, x, y, radius: 0, color }
              setNewCircle([circle])
            }
            break
            
          default:
            // pass
        }
    };

    /* handle mouse move event depending on current drawing tool */
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>): void => {

      const stage = e.target.getStage()

      const { x, y } = stage.getPointerPosition()
      const id = uuidv4()

      /* Skip if user is not drawing */
      if (!isDrawing) return

      switch (tool) {

        case DrawingTool.Pen:
          if (lines[lines.length - 1] !== undefined) {
            let lastLine: LineInterface = lines[lines.length - 1]
            lastLine.points = lastLine.points.concat([x, y])
            lines.splice(lines.length - 1, 1, lastLine)
            setLines(lines.concat())
          }
          break

        case DrawingTool.Brush:
          if (lines[lines.length - 1] !== undefined) {
            let lastBrushLine: LineInterface = lines[lines.length - 1]
            lastBrushLine.points = lastBrushLine.points.concat([x, y])
            lines.splice(lines.length - 1, 1, lastBrushLine)
            setLines(lines.concat())
          }
          break

        case DrawingTool.Eraser:
          if (lines[lines.length - 1] !== undefined) {
            let lastEraseLine: LineInterface = lines[lines.length - 1]
            lastEraseLine.points = lastEraseLine.points.concat([x, y])
            lines.splice(lines.length - 1, 1, lastEraseLine)
            setLines(lines.concat())
          }
          break

        case DrawingTool.Rectangle:
          if (newRectangle.length === 1) {
            const sx = newRectangle[0].x
            const sy = newRectangle[0].y

            const rectangle: RectagleInterface = {
              id,
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              color
            }
            setNewRectangle([rectangle])
          }
          break

        case DrawingTool.Cricle:
          if (newCircle.length === 1) {
            const sx: number = newCircle[0].x
            const sy: number = newCircle[0].y

            const newRadius: number = Math.sqrt(
              Math.pow(x - sx, 2) + Math.pow(y - sy, 2)
            )

            const circle: CircleInterface = { id, x: sx, y: sy, radius: newRadius, color }
            setNewCircle([circle])
          }
          
          break
        default:
          // pass

      }
    };

    /* handle mouse up event depending on current drawing tool */
    const handleMouseUp = (e: KonvaEventObject<MouseEvent>): void => {

      const { x, y } = e.target.getStage().getPointerPosition()
      const id = uuidv4()

      setIsDrawing(false)

      switch (tool) {

        case DrawingTool.Pen:
          break

        case DrawingTool.Brush:
          break

        case DrawingTool.Eraser:
          break

        case DrawingTool.Rectangle:
          if (newRectangle.length === 1) {
            const sx: number = newRectangle[0].x
            const sy: number = newRectangle[0].y

            const rectangle: RectagleInterface = {
              id,
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              color
            }

            setNewRectangle([rectangle])
            
            setRectangles([...rectangles, ...newRectangle])
            setNewRectangle([])
          }
          break

        case DrawingTool.Cricle:
          if (newCircle.length === 1) {
            const sx: number = newCircle[0].x
            const sy: number = newCircle[0].y

            const newRadius: number = Math.sqrt(
              Math.pow(x - sx, 2) + Math.pow(y - sy, 2)
            );

            const circle: CircleInterface = {
              id,
              x: sx,
              y: sy,
              radius: newRadius,
              color
            }

            setNewCircle([circle])

            setCircles([...circles, ...newCircle])
            setNewCircle([])
          }
          break

        default:
          // pass
      }
    };

    const rectanglesToDraw: RectagleInterface[] = [...rectangles, ...newRectangle]
    const circlesToDraw: CircleInterface[] = [...circles, ...newCircle]

  return (
    <div className={`w-[${CANVAS_WIDTH}]px`}>
        <ToolBar 
          onSelectTool={handleSelectTool} 
          onSelectColor={handleSelectColor}
          onErase={handleErase}
          onDownload={handleDownload}
          onUploadImg={handleUploadImg}
         />

        <Stage
          className='overflow-x-auto whitespace-nowrap mx-6 mt-6 shadow-inner shadow-2xl shadow-slate-400 rounded-lg'
          ref={stageRef}
          width={CANVAS_WIDTH}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}>
          <Layer>
            {uploadedImage !== null && <Image image={uploadedImage} />}
            {lines.map((line: LineInterface, i: number) => (
                  <Line
                    className="hover:cursor-pointer"
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.tool === DrawingTool.Pen ? 4 : line.tool === DrawingTool.Brush ? 25 : 25}
                    tension={0.1}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={line.tool === DrawingTool.Eraser ? 'destination-out' : 'source-over'} />
                ))
            }
            {rectanglesToDraw.map((rect: RectagleInterface) => (
                <Rect
                  key={rect.id}
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  fill="transparent"
                  stroke={rect.color}
                  strokeWidth={4} />
              ))}
            {circlesToDraw.map((circle: CircleInterface) => (
              <Circle
                key={circle.id}
                x={circle.x}
                y={circle.y}
                radius={circle.radius}
                fillEnabled={true}
                fill="transparent"
                stroke={circle.color}
                strokeWidth={4} />
            ))}
          </Layer>
        </Stage>
    </div>
  )
}

export default Canvas