import React, { useState } from 'react'
import { DrawingTool } from '../../Types/types'
import CreateIcon from '@mui/icons-material/Create';
import BrushIcon from '@mui/icons-material/Brush';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';

interface ToolSizeContainerProps {
    toolType: DrawingTool;
    onSelectToolSize: (size: string) => void;
}

const DrawingToolSizeContainer: React.FC<ToolSizeContainerProps> = ({ toolType, onSelectToolSize }: ToolSizeContainerProps) => {

    const [toolSize, setToolSize] = useState<string>('sm')

    /* select the tool size (small, medium, large) */
    const handleToolSizeChange = (size: string) => {
        setToolSize(size)
        onSelectToolSize(size)
    }

  return (
    <div className='relative mb-4'>
        {
            toolType === DrawingTool.Pen ? (
                <div className='absolute bottom-10 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <CreateIcon 
                        className={toolSize === 'sm' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                            : 'mr-1 hover:cursor-pointer'}
                        fontSize='small'
                        onClick={() => handleToolSizeChange('sm')}
                         />

                    <CreateIcon 
                        className={toolSize === 'md' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='medium'
                        onClick={() => handleToolSizeChange('md')}
                        />

                    <CreateIcon 
                        className={toolSize === 'lg' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='large'
                        onClick={() => handleToolSizeChange('lg')}
                         />
                </div>
            ) : toolType === DrawingTool.Brush ? (
                <div className='absolute bottom-10 left-6 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <BrushIcon 
                        className={toolSize === 'sm' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='small'
                        onClick={() => handleToolSizeChange('sm')}
                         />

                    <BrushIcon 
                        className={toolSize === 'md' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='medium'
                        onClick={() => handleToolSizeChange('md')}
                        />

                    <BrushIcon 
                        className={toolSize === 'lg' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='large'
                        onClick={() => handleToolSizeChange('lg')}
                         />
                </div>
            ) : toolType === DrawingTool.Rectangle ? (
                <div className='absolute bottom-10 left-16 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <RectangleIcon 
                        className={toolSize === 'sm' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='small'
                        onClick={() => handleToolSizeChange('sm')}
                         />

                    <RectangleIcon 
                        className={toolSize === 'md' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='medium'
                        onClick={() => handleToolSizeChange('md')}
                        />

                    <RectangleIcon 
                        className={toolSize === 'lg' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='large'
                        onClick={() => handleToolSizeChange('lg')}
                         />
                </div>
            ) : toolType === DrawingTool.Cricle ? (
                <div className='absolute bottom-10 left-24 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <CircleIcon 
                        className={toolSize === 'sm' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='small'
                        onClick={() => handleToolSizeChange('sm')}
                         />

                    <CircleIcon 
                        className={toolSize === 'md' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='medium'
                        onClick={() => handleToolSizeChange('md')}
                        />

                    <CircleIcon 
                        className={toolSize === 'lg' ? 'mr-1 hover:cursor-pointer bg-black text-white p-1 rounded-sm'
                        : 'mr-1 hover:cursor-pointer'}
                        fontSize='large'
                        onClick={() => handleToolSizeChange('lg')}
                         />
                </div>
            ) : (<></>)
        }
    </div>
  )
}

export default DrawingToolSizeContainer