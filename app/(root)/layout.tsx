import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Zoom clone",
    description: "Video conferencing app clone",
    icons: {
      icon: "/icons/yoom-logo.svg",
    }
};

const layout = ({children}: {children: ReactNode}) => {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    )
}

export default layout