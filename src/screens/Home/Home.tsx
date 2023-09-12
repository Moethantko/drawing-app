import React from 'react'
import { useAppContentProvider } from '../../providers/AppContentProvider'
import { Drawing } from '../../Types/types'
import { useNavigate } from 'react-router'

const Home = () => {

    const { drawings } = useAppContentProvider()
    const navigate = useNavigate()

    const handleOpenDrawing = (id: string) => {
        navigate(`/canvas/${id}`,  { replace: true })
    }

  return (
    <div className='font-jost'>
        <h3 className='font-semibold text-center mt-6 text-3xl'>Saved Drawings</h3>
        <div className='w-1/4 m-auto mt-4'>
            {
                drawings.map((drawing: Drawing) => (
                    <div className='flex flex-row justify-between p-2 border-[1px] border-gray-300 rounded-md mb-1 text-xl'>
                        <h4>{ drawing.title }</h4>
                        <button onClick={() => handleOpenDrawing(drawing.id)}>Open</button>
                        {/* <a href="#" onClick={() => handleOpenDrawing(drawing.id)}>Open</a> */}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Home