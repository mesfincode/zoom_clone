"use client"    
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {
    const route= useRouter();
    const [meetingState,setMeetingState] = useState<'isScheduledMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard handleClick={()=>setMeetingState('isScheduledMeeting')} img='/icons/add-meeting.svg' title='New Meeting' className='bg-blue-1' description='Start instant meeting now' />
      <HomeCard handleClick={()=>setMeetingState('isScheduledMeeting')} img='/icons/schedule.svg' title='Schedule Meeting' className='bg-purple-1' description='Plan  your meeting' />
      <HomeCard handleClick={()=>route.push('/recordings')} img='/icons/recordings.svg' title='View Recordings' className='bg-orange-1' description='Check out your recordings' />
      <HomeCard handleClick={()=>setMeetingState('isJoiningMeeting')} img='/icons/add-meeting.svg' title='Join Meeting' className='bg-yellow-1' description='Via invitation link' />
    </section>
  )
}

export default MeetingTypeList
 