"use client"

import React, { useEffect, useRef, useMemo, useState } from "react";
import Bar from "../../ui/bar";

import {
  MeetingProvider, 
  MeetingConsumer,
  useMeeting, 
  useParticipant
} from "@videosdk.live/react-sdk"

import {token, createMeeting} from "@/src/app/lib/server"
import ReactPlayer from "react-player";
import { getDisplayName } from "next/dist/shared/lib/utils";



  
  function JoinScreen({
    getMeetingAndToken,
    getDisplayName
  }:{
    getMeetingAndToken: (meeting?: string) => void,
    getDisplayName: (displayName?: string) => void
  }) {
    const [meetingId, setMeetingId] = useState(null)
    const [displayName, setdisplayName] = useState("");

    const onClick = async () => {
        getDisplayName(displayName)
        getMeetingAndToken(meetingId)
    };
    return(
        <div>
          <Bar></Bar>
          <input style={{color:"black"}}
            type="text"
            placeholder="Enter Display Name"
            onChange={(e) => {
                setdisplayName(e.target.value)
            }}
            />
            <input style={{color:"black"}}
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => {
                setMeetingId(e.target.value)
            }}
            />
            <button onClick={onClick}>Join </button>
            { "or" }
            <button onClick={onClick}> Create Meeting</button>
        </div>
    )
  }

  function ParticipantView({participantId} : {participantId: string}){
    const webcamRef = useRef(null);
    const micRef = useRef(null);
    const {webcamStream, micStream, webcamOn, micOn, isLocal, displayName} = useParticipant(participantId);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream
      }
    }, [webcamStream, webcamOn])

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);

          micRef.current.srcObject = mediaStream;
          micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
        );
        } else {
          micRef.current.srcObject = null
        }
      }
    }, [micStream, micOn]);
    return (
      <div key={participantId}>
        <p>
          Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {" "}
          {micOn ? "ON" : "OFF"}
        </p>
        <audio ref={micRef} autoPlay muted={isLocal} />
        {webcamOn && (
          <ReactPlayer

          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          height={"200px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "Participant video error");
          }}
          />
        )}
      </div>
    );
  }

  function Controls(){
    const {leave, toggleMic, toggleWebcam} = useMeeting();
    return(
      <div>
        <button onClick={() => leave()}> Leave </button>
        <button onClick={() => toggleMic()}> toggleMic </button>
        <button onClick={() => toggleWebcam()}> toggleWebcam </button>
      </div>
    )
  }

  function MeetingView({
    onMeetingLeave,
    meetingId,
  }:{
    onMeetingLeave: () => void,
    meetingId:string,
  }) {
    const [joined,setJoined] = useState("");
    const {join, participants} = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
    

    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });
    const joinMeeting = () => {
      setJoined("JOINING");
      join()
    }
    return (
      <div className="container">
        <h3>Meeting Id: {meetingId}</h3>
        {joined && joined == "JOINED" ? (
          <div>
            
            <Controls />

            {[...participants.keys()].map((participantId) => (
              <ParticipantView 
              participantId={participantId}
              key={participantId}
              />
            ))}
            </div>
        ): joined && joined == "JOINING" ? (
          <p>Joining the meeting...</p>
        ): (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
  }

   
 


  function Rooms() {
    const [meetingId, setMeetingId] = useState(null);
    const [displayName, setdisplayName] = useState("");


    //Getting the meeting id by calling the api we just wrote
    const getMeetingAndToken = async (id?:string) => {
      const meetingId =
      id == null ? await createMeeting({token:token}):id;
      setMeetingId(meetingId)
    };

    const getDisplayName = (username?:string) => {
      
      username == null ? setdisplayName(username): setdisplayName(username)
      }
    

    const onMeetingLeave = () => {
      setMeetingId(null)
    }

    
return token && meetingId ? (
  <MeetingProvider
  config = {{
    meetingId,
    micEnabled:true,
    webcamEnabled:true,
    name:displayName,
    debugMode:false,
  }}
  token = {token}
  >
    <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
): (
  <JoinScreen getMeetingAndToken={getMeetingAndToken} getDisplayName={getDisplayName} />
);

  }

  export default Rooms;
/*
<main>
<div>
  
<Bar/>
<>
    <form  action={videoRoom}>
      
      <div className="space-y-12">
        

        <div className="border-b border-white-900/10 pb-12">
          <h2 className="text-base font-semroomName: (formData: FormData) => Promise<void>, token: (formData: FormData) => Promise<void>, formData: FormDataext-white-900">Create or Select Room</h2>
        

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-white-900">
                Create new or Find Room
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="roomName"
                  id="roomName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
         </div>
        

            

            
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-white-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>

    </div>
    </div>
</form>
</> 

            
             
</div>
            
</main>
)

*/
  

