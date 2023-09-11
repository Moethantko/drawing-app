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
  Eraser = 'eraser',
}

export enum DrawingColor {
  Black = 'black',
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple'
}