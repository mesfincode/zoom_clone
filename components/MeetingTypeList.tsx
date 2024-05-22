"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from './ui/toast'

const MeetingTypeList = () => {
  const { toast } = useToast()
  const [loading, setLoading ] = useState(false);
  const route = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduledMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const { user } = useUser()
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetail, setCallDetail] = useState<Call>()
  const createMeeting = async () => {

    if (!client || !user) return;
    try {
      setLoading(true)
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create call')
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })
      setCallDetail(call);
      if (!values.description) {
        route.push(`/meeting/${call.id}`)
      }
      toast({
      
        title: "Meating created successfully",
        // description: "Friday, February 10, 2023 at 5:57 PM",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      })

    } catch (error) {
      setLoading(false)

      toast({title:"Error occured",variant:"destructive"})
      console.log(error)
    }finally{
      setLoading(false);
    }
  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard handleClick={() => setMeetingState('isScheduledMeeting')} img='/icons/add-meeting.svg' title='New Meeting' className='bg-blue-1' description='Start instant meeting now' />
      <HomeCard handleClick={() => setMeetingState('isScheduledMeeting')} img='/icons/schedule.svg' title='Schedule Meeting' className='bg-purple-1' description='Plan  your meeting' />
      <HomeCard handleClick={() => route.push('/recordings')} img='/icons/recordings.svg' title='View Recordings' className='bg-orange-1' description='Check out your recordings' />
      <HomeCard handleClick={() => setMeetingState('isJoiningMeeting')} img='/icons/add-meeting.svg' title='Join Meeting' className='bg-yellow-1' description='Via invitation link' />
      <MeetingModal loading={loading} isOpen={meetingState != undefined} handleClose={() => setMeetingState(undefined)} title="Start a new meeting" buttonText='Start Meeting' className='text-center' handleClick={createMeeting} />

    </section>
  )
}

export default MeetingTypeList
