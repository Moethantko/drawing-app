import React, { createContext, useContext, useState }  from 'react'
import { AppContentContextType, Drawing } from '../Types/types'
import { v4 as uuidv4 } from 'uuid'

export const AppContentContext = createContext<AppContentContextType | null>(null)

interface AppContentProps {
  children: React.ReactNode
}

export const AppContentProvider = ({ children }: AppContentProps) => {
    const [drawings, setDrawings] = useState<Drawing[]>([
        { id: '1', title: 'Test Drawing 1', lines: [], rectangles: [], circles: [] }
    ])

    const saveDrawing = (drawing: Drawing): void => {
      setDrawings([...drawings, drawing])
    }

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