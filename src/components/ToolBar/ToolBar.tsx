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

    const [tool, setTool] = useState('pen');
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
    <div>
        <FormControl>
            <Select
            defaultValue={tool}
            value={tool}
            onChange={handleToolChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    <em>Select Drawing Tool</em>
                </MenuItem>
                <MenuItem value={'pen'}>Pen</MenuItem>
                <MenuItem value={'rect'}>Rectagle</MenuItem>
                <MenuItem value={'circle'}>Circle</MenuItem>
                <MenuItem value={'eraser'}>Eraser</MenuItem>
            </Select>
      </FormControl>
      <FormControl>
         <Select
            defaultValue={color}
            value={color}
            onChange={handleColorChange}
            inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    <em>Select Color</em>
                </MenuItem>
                <MenuItem value={'#FF0000'}>Red</MenuItem>
                <MenuItem value={'#008000'}>Green</MenuItem>
                <MenuItem value={'#0000FF'}>Blue</MenuItem>
                <MenuItem value={'#800080'}>Purple</MenuItem>
            </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={onErase}>
        Erase All
      </Button>
    </div>
  )
}

export default SelectTool