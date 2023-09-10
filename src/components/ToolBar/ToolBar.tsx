import React, { ChangeEventHandler, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import BrushIcon from '@mui/icons-material/Brush';
import EraseConfirmDialog from '../Dialogs/EraseConfirmDialog';
import SaveDialog from '../Dialogs/SaveDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { DrawingTool, DrawingColor } from '../../Types/types';


/* props to handle methods from Canvas component */
interface SelectToolProps {
    onSelectTool: (tool: DrawingTool) => void;
    onSelectColor: (color: DrawingColor) => void;
    onErase: () => void;
    onDownload: (title: string) => void;
    onUploadImg: (img: any) => void;
}

const SelectTool: React.FC<SelectToolProps> = ({ onSelectTool, onSelectColor, onErase, onDownload, onUploadImg }: SelectToolProps) => {
    const [tool, setTool] = useState<DrawingTool>(DrawingTool.Pen)
    const [color, setColor] = useState<string>(DrawingColor.Red)

    const [openEraseConfirmDialog, setOpenEraseConfirmDialog] = useState<boolean>(false)
    const [openSaveDialog, setOpenSaveDialog] = useState<boolean>(false)

    const [drawingTitle, setDrawingTitle] = useState<string>('Untitled Drawing')
    const [hasSaved, setHasSaved] = useState<boolean>(false)

    const fileInputRef = useRef<any>(null)

    /* change the drawing tool in both ToolBar and Canvas components */
    const handleToolChange = (tool: DrawingTool): void => {
        setTool(tool)
        onSelectTool(tool)
    };

    /* change the drawing tool color in both ToolBar and Canvas components */
    const handleColorChange = (color: DrawingColor): void => {
        setColor(color)
        onSelectColor(color)
    };

    /* erase all drawings by calling the erase method from Canvas */
    const handleErase = (): void => {
        onErase()
        setOpenEraseConfirmDialog(false)
    }

    /* hypothetically save the drawing by giving the title to current drawing */
    const handleSaveDrawing = (title: string): void => {
        setDrawingTitle(title)
        setHasSaved(true)
        setOpenSaveDialog(false)
    }

    /* click the hidden html file input */
    const handleUploadBtnClick = (): void => {
        fileInputRef.current.click();
    };

    /* choose the file and upload the image to React state */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // chose the first selected file
        const selectedFile = e.target.files[0]

        if (selectedFile) {
            const reader = new FileReader()
      
            reader.onload = (e) => {
                onUploadImg(e.target.result)

                // clear the currently selected file to allow the user to select the same file
                fileInputRef.current.value = ''
            };
      
            reader.readAsDataURL(selectedFile)
        }
    };

  return (
    <div className={`mt-4 mx-6 w-[${window.innerWidth}]`}>
        <div className='flex justify-between flex-wrap w-full sm:flex-nowrap'>
            <div className='flex'>
                <div className='flex border-[1px] border-gray-300 rounded-md p-1 mr-2 mt-2 md:p-2'>
                    <CreateIcon
                        className={tool === DrawingTool.Pen ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                         : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => handleToolChange(DrawingTool.Pen)} />
                
                    <BrushIcon
                        className={tool === DrawingTool.Brush ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                         : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => handleToolChange(DrawingTool.Brush)} />
                    <RectangleIcon
                        className={tool === DrawingTool.Rectangle ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                        : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => handleToolChange(DrawingTool.Rectangle)} />
                    <CircleIcon
                        className={tool === DrawingTool.Cricle ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                        : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => handleToolChange(DrawingTool.Cricle)} />
                    {/* <FontAwesomeIcon 
                          className={tool === DrawingTool.Eraser ? 'border-[1px] bg-black text-white border-gray-300 rounded-md mr-1 p-1 shadow-slate-900 shadow-lg'
                              : 'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer'}
                            icon={faEraser}
                            size={tool === DrawingTool.Eraser ? 'xl' : '2xl'}
                          onClick={() => handleToolChange(DrawingTool.Eraser)} /> */}
                    <AutoFixNormalIcon
                        className={'border-[1px] border-gray-300 rounded-sm mr-1 hover:cursor-pointer' }
                        fontSize='large'
                        onClick={() => setOpenEraseConfirmDialog(true)} />
                </div>
                <div className='flex border-[1px] border-gray-300 rounded-md p-2 mt-2 mr-2 md:p-2'>
                     <div
                        className={color === DrawingColor.Black ? 'w-8 h-8 bg-black rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-black rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange(DrawingColor.Black)} />
                    <div
                        className={color === DrawingColor.Red ? 'w-8 h-8 bg-red-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-red-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange(DrawingColor.Red)} />
                    <div
                        className={color === DrawingColor.Green ? 'w-8 h-8 bg-green-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-green-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange(DrawingColor.Green)} />
                    <div
                        className={color === DrawingColor.Blue ? 'w-8 h-8 bg-blue-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-blue-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange(DrawingColor.Blue)} />
                    <div
                        className={color === DrawingColor.Purple ? 'w-8 h-8 bg-purple-700 rounded-sm mr-1 p-1 shadow-slate-950 shadow-xl'  :
                        'w-8 h-8 bg-purple-500 rounded-sm mr-1 hover:cursor-pointer'}
                        onClick={() => handleColorChange(DrawingColor.Purple)} />
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
                <div className='ml-2 mt-2' onClick={handleUploadBtnClick}>
                    <Button variant="outlined" startIcon={<FileUploadIcon />} style={{ paddingTop: 12, paddingBottom: 12 }}>
                        Upload
                    </Button>
                </div>
                <input
                    className='hidden'
                    type="file"
                    accept=".png"  
                    ref={fileInputRef}
                    onChange={handleFileChange}/>
                <div className='ml-2 mt-2' onClick={() => onDownload(drawingTitle)}>
                    <Button variant="outlined" startIcon={<DownloadIcon />} style={{ paddingTop: 12, paddingBottom: 12 }}>
                        Download
                    </Button>
                </div>
            </div>
        </div>

        <div className='mt-6'>
            <h3 className='font-jost font-semibold text-2xl p-1 w-1.3'>{ drawingTitle }</h3>
        </div>

        <EraseConfirmDialog
            openEraseConfirmDialog={openEraseConfirmDialog}
            setOpenEraseConfirmDialog={setOpenEraseConfirmDialog}
            handleErase={handleErase} />

         <SaveDialog 
            drawingTitle={drawingTitle}
            openSaveDialog={openSaveDialog}
            setOpenSaveDialog={setOpenSaveDialog}
            handleSaveDrawing={handleSaveDrawing} />
    </div>
  )
}

export default SelectTool