import React, { ChangeEvent, useState } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

interface SaveDialogProps {
    openSaveDialog: boolean;
    setOpenSaveDialog: (open: boolean) => void;
    handleSaveDrawing: (title: string) => void;
    drawingTitle: string;
}

const SaveDialog: React.FC<SaveDialogProps> = ({ openSaveDialog, drawingTitle, setOpenSaveDialog, handleSaveDrawing }: SaveDialogProps) => {

    const [drawingTitleText, setDrawingTitleText] = useState<string>(drawingTitle)

    const [titleCharCount, setTitleCharCount] = useState<number>(drawingTitle.length)
    const CHARLIMIT = 50

    /* handle drawing title change and limit title character count to no more than CHARLIMIT */
    const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length <= CHARLIMIT) {
            setDrawingTitleText(e.currentTarget.value)
            setTitleCharCount(e.currentTarget.value.length)
        }
    }

  return (
    <div>
        <Dialog onClose={() => setOpenSaveDialog(false)} open={openSaveDialog}>
            <DialogTitle className='bg-green-color text-white'>
                <span className='font-jost text-2xl'>Save the drawing</span>
            </DialogTitle>
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
                onChange={(e) => handleFileNameChange(e)} />
                <div className='float-right bg-green-color text-white px-3 py-1 rounded-md'>{titleCharCount}/{CHARLIMIT}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenSaveDialog(false)}>Cancel</Button>
                <Button onClick={() => handleSaveDrawing(drawingTitleText)}>Save Drawing</Button>
            </DialogActions>
            
        </Dialog>
    </div>
  )
}

export default SaveDialog