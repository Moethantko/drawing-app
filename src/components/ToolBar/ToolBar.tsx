import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

interface SelectToolProps {
    onSelectTool: (tool: string) => void;
    onSelectColor: (color: string) => void;
    onErase: () => void;
}

const SelectTool: React.FC<SelectToolProps> = ({ onSelectTool, onSelectColor, onErase }: SelectToolProps) => {

    const [tool, setTool] = useState('');
    const [color, setColor] = useState('Red');

    const handleToolChange = (e: SelectChangeEvent) => {
        setTool(e.target.value as string);
        onSelectTool(e.target.value as string);
    };

    const handleColorChange = (e: SelectChangeEvent) => {
        setColor(e.target.value as string);
        onSelectColor(e.target.value as string);
    };

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
            onClick={onErase}>
            Erase All
        </Button>
    </div>
  )
}

export default SelectTool