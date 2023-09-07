import React from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

interface EraseConfirmDialogProps {
    openEraseConfirmDialog: boolean;
    setOpenEraseConfirmDialog: (open: boolean) => void;
    handleErase: () => void;
}

const EraseConfirmDialog: React.FC<EraseConfirmDialogProps> = ({ openEraseConfirmDialog, setOpenEraseConfirmDialog, handleErase }: EraseConfirmDialogProps) => {
  return (
    <div>
         <Dialog onClose={() => setOpenEraseConfirmDialog(false)} open={openEraseConfirmDialog}>
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
                sx={{ ml: 1 }}
                onClick={() => setOpenEraseConfirmDialog(false)}>
                No
            </Button>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default EraseConfirmDialog