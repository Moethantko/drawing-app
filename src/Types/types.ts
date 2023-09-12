export interface LineInterface {
    id: string
    tool: string
    color: string
    points: number[],
    toolSize: string
  }
  
export interface RectagleInterface {
    id: string
    width: number
    height: number
    x: number
    y: number
    color: string,
    toolSize: string
  }
  
export interface CircleInterface {
    id: string
    x: number
    y: number
    radius: number
    color: string,
    toolSize: string
  }
  
export enum DrawingTool {
  Pen = 'pen',
  Rectangle = 'rectangle',
  Cricle = 'circle',
  Brush = 'brush',
  Mover = 'mover',
}

export enum DrawingColor {
  Black = 'black',
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple'
}

export type Drawing = {
  id: string
  title: string
  lines: LineInterface[]
  rectangles: RectagleInterface[]
  circles: CircleInterface[]
}

export type AppContentContextType = {
  currentDrawing?: string
  drawings: Drawing[]
  saveDrawing: (drawing: Drawing) => void
  findDrawingById: (id: string) => Drawing
}