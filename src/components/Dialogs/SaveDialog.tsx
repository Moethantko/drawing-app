import React, { useState } from 'react'
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

  return (
    <div>
        <Dialog onClose={() => setOpenSaveDialog(false)} open={openSaveDialog}>
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
                <Button onClick={() => handleSaveDrawing(drawingTitleText)}>Save Drawing</Button>
            </DialogActions>
            
        </Dialog>
    </div>
  )
}

export default SaveDialog