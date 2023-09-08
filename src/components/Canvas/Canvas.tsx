import { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Circle, Image } from "react-konva";
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
    const [uploadedImage, setUploadedImgage] = useState<any>(null)

    const[isDrawing, setIsDrawing] = useState<boolean>(false)

    const [lines, setLines] = useState<any>([])

    const [rectangles, setRectangles] = useState<any>([])
    const [newRectangle, setNewRectangle] = useState<any>([])

    const [circles, setCircles] = useState<any>([])
    const [newCircle, setNewCircle] = useState<any>([])

    /* change the drawing tool */
    const handleSelectTool = (tool: string) => {
      setTool(tool)
    }

    /* change the color of drawing tool */
    const handleSelectColor = (color: string) => {
      setColor(color)
    }

    /* erase all the drawings by emptying the all arrays */
    const handleErase = () => {
      setLines([])
      setRectangles([])
      setCircles([])
      setUploadedImgage(null)
    }

    /* upload the existing png image file and replace all current drawings on canvas */
    const handleUploadImg = (img: string) => {

      console.log('In the func')
      
      //first, erase everything currently on canvas before uploading a new img
      handleErase()

      const image = new window.Image()
      image.src = img
      image.onload = () => {
        setUploadedImgage(image)
      };

      //console.log(`Uploaded Img is null: ${uploadedImage === null}`)
    }

    /* download the current drawing as png file */
    const handleDownload = () => {
      const dataURL = stageRef.current.toDataURL()

      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'drawing.png'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    /* handle mouse down event depending on current drawing tool */
    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        switch (tool) {

          case 'pen':
            setIsDrawing(true)
            const penPos = e.target.getStage().getPointerPosition()
            setLines([...lines, { tool, color, points: [penPos.x, penPos.y] }])
            break

          case 'brush':
            setIsDrawing(true)
            const brushPos = e.target.getStage().getPointerPosition()
            setLines([...lines, { tool, color, points: [brushPos.x, brushPos.y] }])
            break

          case 'rect':
            setIsDrawing(true)
            if (newRectangle.length === 0) {
              const { x, y } = e.target.getStage().getPointerPosition()
              const id = uuidv4()
              
              setNewRectangle([{ x, y, width: 0, height: 0, key: id, color }])
            }
            break

          case 'circle':
            setIsDrawing(true)
            if (newCircle.length === 0) {
              const { x, y } = e.target.getStage().getPointerPosition()
              const id = uuidv4()

              setNewCircle([{ x, y, radius: 0, key: id, color }])
            }
            break
            
          default:
            // pass

        }

    };

    /* handle mouse move event depending on current drawing tool */
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {

      switch (tool) {

        case 'pen':
          /* Skip if user is not drawing */
          if (!isDrawing) {
            return
          }

          const stage = e.target.getStage()
          const point = stage.getPointerPosition()

          if (lines[lines.length - 1] !== undefined) {
            let lastLine = lines[lines.length - 1]
            lastLine.points = lastLine.points.concat([point.x, point.y])
            lines.splice(lines.length - 1, 1, lastLine)
            setLines(lines.concat())
          }

          break

        case 'brush':
          /* Skip if user is not drawing */
          if (!isDrawing) {
            return
          }
    
          const brushStage = e.target.getStage()
          const brushPos = brushStage.getPointerPosition()

          if (lines[lines.length - 1] !== undefined) {
            let lastBrushLine = lines[lines.length - 1]
            lastBrushLine.points = lastBrushLine.points.concat([brushPos.x, brushPos.y])
            lines.splice(lines.length - 1, 1, lastBrushLine)
            setLines(lines.concat())
          }
          break

        case 'rect':
          if (newRectangle.length === 1) {
            const sx = newRectangle[0].x
            const sy = newRectangle[0].y

            const { x, y } = e.target.getStage().getPointerPosition()
            const id = uuidv4()

            setNewRectangle([
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
          break

        case 'circle':
          if (newCircle.length === 1) {

            const sx = newCircle[0].x
            const sy = newCircle[0].y

            const { x, y } = e.target.getStage().getPointerPosition()
            const id = uuidv4()

            const newRadius = Math.sqrt(
              Math.pow(x - sx, 2) + Math.pow(y - sy, 2)
            );

            setNewCircle([{ x: sx, y: sy, key: id, radius: newRadius, color }])
          }
          
          break
        default:
          // pass

      }
    };

    /* handle mouse up event depending on current drawing tool */
    const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {

      switch (tool) {
        case 'pen':
          setIsDrawing(false)
          break
        case 'brush':
          setIsDrawing(false)
          break
        case 'rect':
          if (newRectangle.length === 1) {
            const sx = newRectangle[0].x
            const sy = newRectangle[0].y

            const { x, y } = e.target.getStage().getPointerPosition()
            
            const annotationToAdd = {
              x: sx,
              y: sy,
              width: x - sx,
              height: y - sy,
              key: rectangles.length + 1,
              color
            }

            setNewRectangle([])
            setRectangles([...rectangles, annotationToAdd])
          }
          break
        case 'circle':
          if (newCircle.length === 1) {
            const sx = newCircle[0].x
            const sy = newCircle[0].y

            const { x, y } = e.target.getStage().getPointerPosition()

            const newRadius = Math.sqrt(
              Math.pow(x - sx, 2) + Math.pow(y - sy, 2)
            );
            
            const circleToAdd = {
              x: sx,
              y: sy,
              key: circles.length + 1,
              radius: newRadius,
              color
            }

            setNewCircle([])
            setCircles([...circles, circleToAdd])
          }
          break

      }
    };

    const rectanglesToDraw = [...rectangles, ...newRectangle]
    const circlesToDraw = [...circles, ...newCircle]

  return (
    <div>
        <ToolBar 
          onSelectTool={handleSelectTool} 
          onSelectColor={handleSelectColor}
          onErase={handleErase}
          onDownload={handleDownload}
          handleUploadImg={handleUploadImg}
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

          {uploadedImage !== null && <Image image={uploadedImage} />}

          {
              lines.map((line: any, i: any) => (
                <Line
                  className="hover:cursor-pointer"
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={line.tool === 'pen' ? 4 : line.tool === 'brush' ? 25 : 4}
                  tension={0.1}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={"source-over"}
                />
              ))
          }

          {rectanglesToDraw.map((rect: any) => (
              <Rect
                key={rect.key}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="transparent"
                stroke={rect.color}
                strokeWidth={4}
              />
            ))}

          {circlesToDraw.map((circle: any) => (
            <Circle
              key={circle.key}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              fillEnabled={true}
              fill="transparent"
              stroke={circle.color}
              strokeWidth={4}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas