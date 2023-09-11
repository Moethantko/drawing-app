import React from 'react'
import { DrawingTool } from '../../Types/types'
import CreateIcon from '@mui/icons-material/Create';
import BrushIcon from '@mui/icons-material/Brush';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';

interface ToolSizeContainerProps {
    toolType: DrawingTool;
    // onChangeDrawingToolSize: (size: string) => void;
}

const DrawingToolSizeContainer: React.FC<ToolSizeContainerProps> = ({ toolType }: ToolSizeContainerProps) => {
  return (
    <div className='relative mb-4'>
        {
            toolType === DrawingTool.Pen ? (
                <div className='absolute bottom-10 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <CreateIcon className='mr-1 hover:cursor-pointer'
                        fontSize='small'
                         />

                    <CreateIcon className='mr-1 hover:cursor-pointer'
                        fontSize='medium'
                        />

                    <CreateIcon className='hover:cursor-pointer'
                        fontSize='large'
                         />
                </div>
            ) : toolType === DrawingTool.Brush ? (
                <div className='absolute bottom-10 left-12 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <BrushIcon className='mr-1 hover:cursor-pointer'
                        fontSize='small'
                         />

                    <BrushIcon className='mr-1 hover:cursor-pointer'
                        fontSize='medium'
                        />

                    <BrushIcon className='hover:cursor-pointer'
                        fontSize='large'
                         />
                </div>
            ) : toolType === DrawingTool.Rectangle ? (
                <div className='absolute bottom-10 left-20 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <RectangleIcon className='mr-1 hover:cursor-pointer'
                        fontSize='small'
                         />

                    <RectangleIcon className='mr-1 hover:cursor-pointer'
                        fontSize='medium'
                        />

                    <RectangleIcon className='mr-1 hover:cursor-pointer'
                        fontSize='large'
                         />
                </div>
            ) : toolType === DrawingTool.Cricle ? (
                <div className='absolute bottom-10 left-32 flex flex-row items-center border-[1px] border-slate-300 rounded-md px-1'>
                    <CircleIcon className='mr-1 hover:cursor-pointer'
                        fontSize='small'
                         />

                    <CircleIcon className='mr-1 hover:cursor-pointer'
                        fontSize='medium'
                        />

                    <CircleIcon className='mr-1 hover:cursor-pointer'
                        fontSize='large'
                         />
                </div>
            ) : (<></>)
        }
    </div>
  )
}

export default DrawingToolSizeContainer