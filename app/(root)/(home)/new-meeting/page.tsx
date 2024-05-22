"use client"

import React from 'react'
import { useEffect, useState } from "react";
import {
    Call,
    CallControls,
    StreamCall,
    StreamTheme,
    StreamVideo,
    SpeakerLayout,
    StreamVideoClient
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const callId = "csb-" + Math.random().toString(16).substring(2);
const user_id = "csb-user";
const user = { id: user_id };
const apiKey =process.env.NEXT_PUBLIC_STREAM_API_KEY??"";
const screat = process.env.STREAM_SECREAT_KEY??""
const tokenProvider = async () => {
    const { token } = await fetch(
        "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
            api_key: apiKey,
            user_id: user_id
        })
    ).then((res) => res.json());
    return token as string;
};

const NewMeeting = () => {
    const [client, setClient] = useState<StreamVideoClient>();
    const [call, setCall] = useState<Call>();

    useEffect(() => {
        const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
        setClient(myClient);
        return () => {
            myClient.disconnectUser();
            setClient(undefined);
        };
    }, []);

    useEffect(() => {
        if (!client) return;
        const myCall = client.call("default", callId);
        myCall.join({ create: true }).catch((err) => {
            console.error(`Failed to join the call`, err);
        });

        setCall(myCall);

        return () => {
            setCall(undefined);
            myCall.leave().catch((err) => {
                console.error(`Failed to leave the call`, err);
            });
        };
    }, [client]);

    if (!client || !call) return null;

    return (
        <StreamVideo client={client}>
            <StreamTheme className="my-theme-overrides">
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
}

export default NewMeeting
