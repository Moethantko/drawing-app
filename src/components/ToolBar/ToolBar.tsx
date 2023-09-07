import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CreateIcon from '@mui/icons-material/Create';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import BrushIcon from '@mui/icons-material/Brush';

interface SelectToolProps {
    onSelectTool: (tool: string) => void;
    onSelectColor: (color: string) => void;
    onErase: () => void;
    onDownload: () => void;
}

const SelectTool: React.FC<SelectToolProps> = ({ onSelectTool, onSelectColor, onErase, onDownload }: SelectToolProps) => {

    const [tool, setTool] = useState<string>('pen')
    const [color, setColor] = useState<string>('red')

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [openSaveDialog, setOpenSaveDialog] = useState<boolean>(false)

    const [drawingTitle, setDrawingTitle] = useState<string>('Untitled Drawing')

    const [drawingTitleText, setDrawingTitleText] = useState<string>(drawingTitle)
    const [hasSaved, setHasSaved] = useState<boolean>(false)

    const handleToolChange = (tool: string) => {
        setTool(tool)
        onSelectTool(tool)
    };

    const handleColorChange = (color: string) => {
        setColor(color)
        onSelectColor(color)
    };

    const handleErase = () => {
        onErase()
        setOpenDialog(false)
    }

    const handleSaveDrawing = () => {
        setDrawingTitle(drawingTitleText)
        setHasSaved(true)
        setOpenSaveDialog(false)
    }

  return (
    <div className='mt-4 ml-6'>
        <div className='flex flex-wrap w-min sm:flex-nowrap'>
            <div className='flex'>
                <div className='flex border-[1px] border-gray-300 rounded-md p-1 mr-2 mt-2 md:p-2'>
                    <CreateIcon
                        className={tool === 'pen' ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                         : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => handleToolChange('pen')} />
                
                    <BrushIcon
                        className={tool === 'brush' ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                         : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => handleToolChange('brush')} />
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
                <div className='flex border-[1px] border-gray-300 rounded-md p-2 mt-2 mr-2 md:p-2'>
                     <div
                        className={color === 'black' ? 'w-8 h-8 bg-black rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-black rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange('black')} />
                    <div
                        className={color === 'red' ? 'w-8 h-8 bg-red-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-red-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange('red')} />
                    <div
                        className={color === 'green' ? 'w-8 h-8 bg-green-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-green-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange('green')} />
                    <div
                        className={color === 'blue' ? 'w-8 h-8 bg-blue-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-blue-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange('blue')} />
                    <div
                        className={color === 'purple' ? 'w-8 h-8 bg-purple-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-purple-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange('purple')} />
                </div>
            </div>

            <div className='flex'>
                <div className='hover:cursor-pointer inline ml-0 mt-2' onClick={() => setOpenSaveDialog(true)}>
                    {
                        hasSaved ? (
                            <Button variant="outlined" startIcon={<SaveIcon />} style={{ paddingTop: 12, paddingBottom: 12 }}>
                                Save
                            </Button>
                        ) : (
                            <Button variant="outlined" startIcon={<SaveAsIcon />} style={{ paddingTop: 12, paddingBottom: 12, width: 117 }}>
                                Save As
                            </Button>
                        )
                    }
                </div>
                <div className='ml-2 mt-2'>
                    <Button variant="outlined" startIcon={<FileUploadIcon />} style={{ paddingTop: 12, paddingBottom: 12 }}>
                        Upload
                    </Button>
                </div>
                <div className='ml-2 mt-2' onClick={onDownload}>
                    <Button variant="outlined" startIcon={<DownloadIcon />} style={{ paddingTop: 12, paddingBottom: 12 }}>
                        Download
                    </Button>
                </div>
            </div>
        </div>
        <div className='mt-6'>
            <h3 className='font-jost font-semibold text-2xl p-1 w-1.3'>{ drawingTitle }</h3>
        </div>
        
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
            <DialogTitle>Are you sure you want to erase all drawings?</DialogTitle>
            <DialogContent>
            <Button
                color='error'
                variant="contained"
                onClick={handleErase}>
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

        <Dialog onClose={() => setOpenDialog(false)} open={openSaveDialog}>
            <DialogTitle className='bg-green-color text-white'>Save the drawing</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="File Name"
                type="email"
                fullWidth
                variant="standard"
                value={drawingTitleText}
                onChange={(e) => setDrawingTitleText(e.currentTarget.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenSaveDialog(false)}>Cancel</Button>
                <Button onClick={handleSaveDrawing}>Save Drawing</Button>
            </DialogActions>
            
        </Dialog>
    </div>
  )
}

export default SelectTool