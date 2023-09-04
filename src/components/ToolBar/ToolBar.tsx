import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface SelectToolProps {
    onSelectTool: (tool: string) => void;
    onSelectColor: (color: string) => void;
    onErase: () => void;
}

const SelectTool: React.FC<SelectToolProps> = ({ onSelectTool, onSelectColor, onErase }: SelectToolProps) => {

    const [tool, setTool] = useState('');
    const [color, setColor] = useState('Red');
    const [openDialog, setOpenDialog] = useState(false)

    const handleToolChange = (e: SelectChangeEvent) => {
        setTool(e.target.value as string);
        onSelectTool(e.target.value as string);
    };

    const handleColorChange = (e: SelectChangeEvent) => {
        setColor(e.target.value as string);
        onSelectColor(e.target.value as string);
    };

    const handleErase = () => {
        onErase()
        setOpenDialog(false)
    }

  return (
    <div className='ml-6 mt-4'>
        <FormControl className='w-32' sx={{ mr: 2 }}>
            <Select
                value={tool}
                onChange={handleToolChange}
                displayEmpty
            >
                <MenuItem disabled value="">
                    <em>Tool</em>
                </MenuItem>
                <MenuItem value={'pen'}>Pen</MenuItem>
                <MenuItem value={'rect'}>Rectagle</MenuItem>
                <MenuItem value={'circle'}>Circle</MenuItem>
                <MenuItem value={'eraser'}>Eraser</MenuItem>
            </Select>
        </FormControl>
        <FormControl className='w-32' sx={{ mr: 2 }}>
            <Select
                value={color}
                onChange={handleColorChange}
                displayEmpty
                >
                    <MenuItem disabled value="">
                        <em>Color</em>
                    </MenuItem>
                    <MenuItem value={'#FF0000'}>Red</MenuItem>
                    <MenuItem value={'#008000'}>Green</MenuItem>
                    <MenuItem value={'#0000FF'}>Blue</MenuItem>
                    <MenuItem value={'#800080'}>Purple</MenuItem>
                </Select>
        </FormControl>
        <Button
            className='hover:bg-red-100'
            sx={{ p: 2, backgroundColor: 'red' }}
            variant="contained"
            onClick={() => setOpenDialog(true)}>
            Erase All
        </Button>
        <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
            <DialogTitle>Are you sure you want to erase all drawings?</DialogTitle>
            <DialogContent>
            <Button
                className='hover:bg-red-100'
                color='error'
                variant="contained"
                onClick={() => {
                    onErase();
                    setOpenDialog(false);
                }}>
                Yes
            </Button>
            <Button
                className='hover:bg-red-100'
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