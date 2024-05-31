'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

export const MeetingSetup = ({ setIsSetupComplete } : { setIsSetupComplete: (value: boolean) => void }) => {
    
    const [isMiCamToggledOn, setIsMiCamToggledOn] = useState(false)
    
    const call = useCall()

    if(!call) {
        throw new Error('useCall must be used within a StreamCall component')
    }

    useEffect(() => {
      if(isMiCamToggledOn) {
        call?.camera?.disable()
        call?.microphone?.disable()
      } else {
        call?.camera?.enable()
        call?.microphone?.enable()
      }

    }, [call?.camera, isMiCamToggledOn, call?.microphone])
    
    
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>Setup Meeting</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type='checkbox'
                        checked={isMiCamToggledOn}
                        onChange={(e) => setIsMiCamToggledOn(e.target.checked)}
                    />
                    <span>Join with mic and camera off</span>
                </label>
                <DeviceSettings />
            </div>
            <Button 
                className='rounded-md bg-green-500 px-4 py-2.5' 
                onClick={() => {
                    call?.join(); 
                    setIsSetupComplete(true)
                }}
            >Join Meeting</Button>
        </div>
    )
}
