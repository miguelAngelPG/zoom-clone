import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { start } from 'repl'

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const client = useStreamVideoClient()
    const { user } = useUser()

    useEffect(() => {
        const fetchCalls = async () => {


            if(!user?.id || !client) return
            setIsLoading(true)
            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id},
                            { members: { $in: [user.id]} }
                        ]
                    }
                })
                setCalls(calls)
            } catch (error) {
                console.log(error)
            } finally {

                setIsLoading(false)
            }

        }

        fetchCalls()
    }, [client, user?.id])

    const now = new Date()
    console.log(calls, 'calls')

    const endedCalls = calls.filter(({ state: { startsAt, endedAt }}: Call) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    })
    const upcomingCalls = calls.filter(({ state: { startsAt }}: Call) => {
        return startsAt && new Date(startsAt) > now
    })

    return { 
        isLoading,
        endedCalls,
        upcomingCalls,
        callRecordings: calls
    }

}