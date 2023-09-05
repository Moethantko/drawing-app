import React, { MouseEvent, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

interface SelectToolProps {
    onSelectTool: (tool: string) => void;
    onSelectColor: (color: string) => void;
    onErase: () => void;
}

const SelectTool: React.FC<SelectToolProps> = ({ onSelectTool, onSelectColor, onErase }: SelectToolProps) => {

    const [tool, setTool] = useState('');
    const [color, setColor] = useState('Red');
    const [openDialog, setOpenDialog] = useState(false)

    const handleToolChange = (tool: string) => {
        setTool(tool);
        onSelectTool(tool);
    };

    const handleColorChange = (color: string) => {
        setColor(color);
        onSelectColor(color);
    };

    const handleErase = () => {
        onErase()
        setOpenDialog(false)
    }

  return (
    <div className='ml-6 mt-4'>
        <div className='flex m-auto w-min'>
            <div className='flex flex-row border-[1px] border-gray-300 rounded-md p-2 justify-center mr-2'>
                <CreateIcon 
                    className={tool === 'pen' ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg' 
                     : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                    fontSize='large'
                    onClick={() => handleToolChange('pen')} />
                <RectangleIcon 
                    className={tool === 'rect' ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg' 
                    : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                    fontSize='large'
                    onClick={() => handleToolChange('rect')} />
                <CircleIcon 
                    className={tool === 'circle' ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg' 
                    : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                    fontSize='large'
                    onClick={() => handleToolChange('circle')} />
                <AutoFixNormalIcon 
                    className={tool === 'eraser' ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg' 
                    : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                    fontSize='large'
                    onClick={() => setOpenDialog(true)} />
            </div>

            <div className='flex flex-row border-[1px] border-gray-300 rounded-md p-2 justify-center'>
                <div 
                    className={color === 'red' ? 'w-8 h-8 bg-red-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  : 
                    'w-8 h-8 bg-red-500 rounded-sm mr-1'}
                    onClick={() => handleColorChange('red')} />
                <div 
                    className={color === 'green' ? 'w-8 h-8 bg-green-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  : 
                    'w-8 h-8 bg-green-500 rounded-sm mr-1'}
                    onClick={() => handleColorChange('green')} />
                <div 
                    className={color === 'blue' ? 'w-8 h-8 bg-blue-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  : 
                    'w-8 h-8 bg-blue-500 rounded-sm mr-1'}
                    onClick={() => handleColorChange('blue')} />
                <div 
                    className={color === 'purple' ? 'w-8 h-8 bg-purple-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  : 
                    'w-8 h-8 bg-purple-500 rounded-sm mr-1'}
                    onClick={() => handleColorChange('purple')} />
            </div>
            
        </div>
        
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
            <DialogTitle>Are you sure you want to erase all drawings?</DialogTitle>
            <DialogContent>
            <Button
                color='error'
                variant="contained"
                onClick={() => {
                    onErase();
                    setOpenDialog(false);
                }}>
                Yes
            </Button>
            <Button
                variant="contained"
                sx={{ ml:1 }}
                onClick={() => setOpenDialog(false)}>
                No
            </Button>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default SelectTool