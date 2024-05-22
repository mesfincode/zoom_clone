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
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const MeetingTypeList = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);
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
        route.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });

    } catch (error) {
      setLoading(false)

      toast({ title: "Error occured", variant: "destructive" })
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard handleClick={() => setMeetingState('isInstantMeeting')} img='/icons/add-meeting.svg' title='New Meeting' className='bg-blue-1' description='Start instant meeting now' />
      <HomeCard handleClick={() => setMeetingState('isJoiningMeeting')} img='/icons/add-meeting.svg' title='Join Meeting' className='bg-yellow-1' description='Via invitation link' />

      <HomeCard handleClick={() => setMeetingState('isScheduledMeeting')} img='/icons/schedule.svg' title='Schedule Meeting' className='bg-purple-1' description='Plan  your meeting' />
      <HomeCard handleClick={() => route.push('/recordings')} img='/icons/recordings.svg' title='View Recordings' className='bg-orange-1' description='Check out your recordings' />
      
      {
        !callDetail?(
          <MeetingModal
          loading={loading}
          isOpen={meetingState === 'isScheduledMeeting'}
          handleClose={() => setMeetingState(undefined)}
          title="Create meeting"
          handleClick={createMeeting}
          buttonText='Schedule Meeting'
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
               Add a description
            </label>
            <Textarea 
                 className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                 onChange={(e) =>
                   setValues({ ...values, description: e.target.value })
                 }
            />

          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
              <ReactDatePicker selected={values.dateTime}
              onChange={(date)=>setValues({...values,dateTime:date!})}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
          </div>
        </MeetingModal>
        ):(
          <MeetingModal
          loading={loading}
          isOpen={meetingState === "isScheduledMeeting"}
          handleClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"       
        />
        )
      }
      <MeetingModal
        loading={loading}
        isOpen={meetingState === 'isInstantMeeting'}
        handleClose={() => setMeetingState(undefined)}
        title="Start a new meeting"
        buttonText='Start Meeting'
        className='text-center'
        handleClick={createMeeting}
      />

    </section>
  )
}

export default MeetingTypeList
