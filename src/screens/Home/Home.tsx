import React from 'react'
import { useAppContentProvider } from '../../providers/AppContentProvider'
import { Drawing } from '../../Types/types'
import { useNavigate } from 'react-router'
import FolderIcon from '@mui/icons-material/Folder';

const Home = () => {

    const { drawings } = useAppContentProvider()
    const navigate = useNavigate()

    const handleOpenDrawing = (id: string) => {
        navigate(`/canvas/${id}`,  { replace: true })
    }

  return (
    <div className='font-jost'>
        <h3 className='font-semibold text-center mt-6 text-3xl'>Saved Drawings</h3>
        <div className='w-2/3 m-auto mt-12'>
            {
                drawings.map((drawing: Drawing) => (
                    <div 
                        className='flex flex-row justify-between p-2 border-[1px] border-gray-300 rounded-md mb-1 text-xl hover:cursor-pointer hover:bg-slate-100'
                        onClick={() => handleOpenDrawing(drawing.id)}>
                        <div className='flex'>
                            <FolderIcon fontSize='medium' className='mr-2' />
                            <h4>{ drawing.title }</h4>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home