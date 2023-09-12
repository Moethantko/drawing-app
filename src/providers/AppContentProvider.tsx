import React, { createContext, useContext, useEffect, useState }  from 'react'
import { AppContentContextType, Drawing } from '../Types/types'
import { v4 as uuidv4 } from 'uuid'

export const AppContentContext = createContext<AppContentContextType | null>(null)

interface AppContentProps {
  children: React.ReactNode
}

export const AppContentProvider = ({ children }: AppContentProps) => {
    const [drawings, setDrawings] = useState<Drawing[]>([
        { id: uuidv4(), title: 'Untitled Drawing', lines: [], rectangles: [], circles: [] }
    ])

    /* save the drawing by adding to the drawings array */
    const saveDrawing = (drawing: Drawing): void => {
      setDrawings([...drawings, drawing])
    }

    /* find a drawing from drawings array by id and return the drawing if found */
    const findDrawingById = (id: string): Drawing => {
      return drawings.find(drawing => drawing.id === id) || null
    }

  return (
    <AppContentContext.Provider 
    value={{ drawings, saveDrawing, findDrawingById }}>
            { children }
    </AppContentContext.Provider>
  )
}

export const useAppContentProvider = () => useContext(AppContentContext)