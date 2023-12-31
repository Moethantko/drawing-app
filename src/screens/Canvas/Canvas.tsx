import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle, Image } from "react-konva";
import ToolBar from "../../components/ToolBar/ToolBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuidv4 } from 'uuid';
import { LineInterface, RectagleInterface, CircleInterface, DrawingTool, DrawingColor, Drawing } from '../../Types/types'
import { Navigate, useNavigate, useParams } from "react-router";
import { useAppContentProvider } from "../../providers/AppContentProvider";
  
const Canvas = () => {
    const CANVAS_WIDTH = 1920

    const navigate = useNavigate()

    const { drawingId } = useParams()
    const { findDrawingById, saveDrawing } = useAppContentProvider()

    const [title, setTitle] = useState<string>('')
    const [tool, setTool] = useState<DrawingTool>(DrawingTool.Pen)
    const [toolSize, setToolSize] = useState<string>('sm')
    const [color, setColor] = useState<DrawingColor>(DrawingColor.Black)

    const stageRef = useRef<any>(null)
    const [uploadedImage, setUploadedImgage] = useState<HTMLImageElement>(null)

    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const [isDraggable, setIsDraggable] = useState<boolean>(false)

    const [lines, setLines] = useState<LineInterface[]>([])

    const [rectangles, setRectangles] = useState<RectagleInterface[]>([])
    const [newRectangle, setNewRectangle] = useState<RectagleInterface[]>([])

    const [circles, setCircles] = useState<CircleInterface[]>([])
    const [newCircle, setNewCircle] = useState<CircleInterface[]>([])

    /* find the drawing by id from global state and set the current drawing */
    useEffect(() => {
      const drawing: Drawing = findDrawingById(drawingId)

      /* get existing drawings from the file */
      setTitle(drawing.title)
      setLines(drawing.lines || [])
      setRectangles(drawing.rectangles || [])
      setCircles(drawing.circles || [])
    }, [])

    /* change the drawing tool */
    const handleSelectTool = (tool: DrawingTool): void => {
      setTool(tool)
      if (tool === DrawingTool.Mover) {
        setIsDraggable(true)
      } else {
        setIsDraggable(false)
      }
    }

    /* change the drawing tool size */
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

    /* determine the stroke width based on drawing tool type and size (sm, md, lg) */
    const handleChangeStrokeWidth = (tool: DrawingTool, size: string): number => {
      switch (tool) {
        case DrawingTool.Pen:
          if (size === 'sm') {
            return 5
          } else if (size === 'md') {
            return 10
          } else {
            return 15
          }
          break
        
        case DrawingTool.Brush:
          if (size === 'sm') {
            return 25
          } else if (size === 'md') {
            return 30
          } else {
            return 35
          }
          break

        case DrawingTool.Rectangle:
          if (size === 'sm') {
            return 5
          } else if (size === 'md') {
            return 8
          } else {
            return 13
          }
          break

        case DrawingTool.Cricle:
          if (size === 'sm') {
            return 5
          } else if (size === 'md') {
            return 8
          } else {
            return 13
          }
          break

        default:
          break
        
      }
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
    const handleDownload = (): void => {
      const dataURL = stageRef.current.toDataURL()

      const link = document.createElement('a')
      link.href = dataURL
      link.download = `${title}.png`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    /* save the drawing by calling saveDrawing method from App Content Provider */
    const handleSaveDrawing = (drawingTitle: string): void => {
      const drawing: Drawing = { 
        id: uuidv4(), title: drawingTitle, lines, rectangles, circles
      }

      setTitle(drawingTitle) // set the title locally
      saveDrawing(drawing) // save in App Content Provider
    }

    /* handle mouse down event depending on current drawing tool */
    const handleMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
      setIsDrawing(true)
      
      const { x, y } = e.target.getStage().getPointerPosition() // current coordinates (x,y) of mouse pointer
      const id = uuidv4() // id generated for each drawing

        switch (tool) {
          case DrawingTool.Pen:
            const newPenLine: LineInterface = {
              id, tool, color, points: [x, y], toolSize,
            }
            setLines([...lines, newPenLine])
            break

          case DrawingTool.Brush:
            const newBrushLine: LineInterface = {
              id, tool, color, points: [x, y], toolSize
            }
            setLines([...lines, newBrushLine])
            break

          case DrawingTool.Rectangle:
            if (newRectangle.length === 0) {
              const rectangle: RectagleInterface = { id, x, y, width: 0, height: 0, color, toolSize }
              setNewRectangle([rectangle])
            }
            break

          case DrawingTool.Cricle:
            if (newCircle.length === 0) {
              const circle: CircleInterface = { id, x, y, radius: 0, color, toolSize }
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
              color,
              toolSize
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

            const circle: CircleInterface = { id, x: sx, y: sy, radius: newRadius, color, toolSize }
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
              color,
              toolSize
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
              color,
              toolSize
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

        <div className="ml-6 mb-12 mt-4 hover:cursor-pointer" onClick={() => navigate('/')}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </div>

        <ToolBar 
          title={title}
          onSelectTool={handleSelectTool} 
          onSelectColor={handleSelectColor}
          onErase={handleErase}
          onSave={handleSaveDrawing}
          onDownload={handleDownload}
          onUploadImg={handleUploadImg}
          onSelectToolSize={handleSelectToolSize}
         />

        <div className='mt-6 ml-6'>
            <h3 className='font-jost font-semibold text-2xl p-1 w-full'>{ title }</h3>
        </div>

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
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={handleChangeStrokeWidth(line.tool === DrawingTool.Pen ? DrawingTool.Pen : DrawingTool.Brush, line.toolSize)}
                    tension={0.1}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={'source-over'}
                    draggable={isDraggable} />
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
                  strokeWidth={handleChangeStrokeWidth(DrawingTool.Rectangle, rect.toolSize)}
                  draggable={isDraggable} />
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
                strokeWidth={handleChangeStrokeWidth(DrawingTool.Cricle, circle.toolSize)}
                draggable={isDraggable} />
            ))}
          </Layer>
        </Stage>
    </div>
  )
}

export default Canvas