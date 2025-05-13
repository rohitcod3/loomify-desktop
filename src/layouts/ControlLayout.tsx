import { cn, onCloseApp } from '@/lib/utils'
import { UserButton } from '@clerk/clerk-react'
import { MountainIcon, X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
    className?: string
}

const ControlLayout = ({children, className}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    window.ipcRenderer.on('hide-plugin', (event,payload) => {
        console.log(event)
        setIsVisible(payload.state)
    })
  return (
    <div className={cn(
        className,
        isVisible && 'invisible',
        'bg-[#171717] flex px-1 flex-col rounded-3xl overflow-hidden h-screen'
    )}
    >
    <div className='flex justify-between items-center p-5 draggable'>
    <span className='non-draggable'>
     <UserButton/>
     <X
     size={20}
     className='text-gray-400 non-draggable hover:text-white cursor-pointer'
     onClick={onCloseApp}
     />
    </span>
    </div>

    <div className='flex-1 h-0 overflow-auto'>
     {children}
    </div>

    <div className='p-5 gap-2 flex w-full'>
         <div className='flex items-center gap-x-2'><MountainIcon color='#fff'/></div>
         <p className='text-white text-2xl'>Loomify</p>
      </div>

    </div>
  )
}

export default ControlLayout