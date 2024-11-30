import { useState, useEffect, useRef } from "react";
import { IconButton, Typography, Box, Dialog } from "@mui/material";
import {
  Close as CloseIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  CallEnd as CallEndIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
} from "@mui/icons-material";
import IncomingCallDialog from "./IncomingCallDialog";

const VideoCallComponent = ({ open, onClose, contact, socket }) => {
  const userId = localStorage.getItem("Puser");

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [incomingSignal, setIncomingSignal] = useState(null);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef();

  const servers = {
    iceServers: [{ urls: ["stun:stun1.l.google.com:19302"] }],
  };

  const initializePeerConnection = () => {
    if (peerConnection.current && peerConnection.current.signalingState !== "closed") {
      peerConnection.current.close();
    }
    peerConnection.current = new RTCPeerConnection(servers);
  
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("iceCandidate", {
          to: contact._id,
          candidate: event.candidate,
        });
      }
    };
  
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        setRemoteStream(event.streams[0]);
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  };
  
  

  useEffect(() => {
    if (!socket) return;

    socket.on("callUser", ({ from, signal }) => {
      setIsReceivingCall(true);
      setIncomingSignal(signal);
      initializePeerConnection();
    });

    socket.on("callAccepted", async (signal) => {
      try {
        console.log("Signal received in callAccepted:", signal);
        console.log("Sigal ",peerConnection.current)
        if (peerConnection.current?.signalingState === "have-local-offer") {
          const answerDesc = new RTCSessionDescription(signal);
          await peerConnection.current.setRemoteDescription(answerDesc);
          setCallAccepted(true);
          console.log("Remote description set successfully");
        } else {
          console.error(
            "Invalid signaling state for setting remote description:",
            peerConnection.current?.signalingState
          );
        }
      } catch (error) {
        console.error("Failed to set remote description:", error);
      }
    });

    socket.on("iceCandidate", async ({ candidate }) => {
      try {
        if (peerConnection.current && candidate) {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    });

    return () => {
      socket.off("callUser");
      socket.off("callAccepted");
      socket.off("iceCandidate");
    };
  }, [socket]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
  
      // Clean up any previous connection and reinitialize
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
  
      initializePeerConnection(); // Ensure a new RTCPeerConnection is created
  
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => {
        if (peerConnection.current.signalingState !== "closed") {
          peerConnection.current.addTrack(track, stream);
        } else {
          throw new Error("PeerConnection is closed");
        }
      });
  
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
  
      console.log(
        "Signaling state after setting local description:",
        peerConnection.current.signalingState
      );
  
      socket.emit("callUser", {
        userToCall: contact._id,
        from: userId,
        signalData: offer,
      });
  
      setIsCalling(true);
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };
  
  

  const answerCall = async () => {
    try {
      if (!incomingSignal) {
        console.error("No incoming signal to answer.");
        return;
      }
  
      console.log("Incoming signal:", incomingSignal);
  
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
  
      initializePeerConnection();
      console.log("connection ",peerConnection.current)
      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });
  
      console.log("Setting remote description...");
      const remoteDesc = new RTCSessionDescription(incomingSignal);
      await peerConnection.current.setRemoteDescription(remoteDesc);
      console.log("Remote description set.");
  
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      console.log("Local answer set:", answer);
  
      socket.emit("answerCall", { to: contact._id, signal: answer });
      console.log("Answer sent to:", contact._id);
  
      setCallAccepted(true);
      setIsReceivingCall(false);
    } catch (error) {
      console.error("Error answering call:", error);
    }
  };
  
  

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
  
    if (peerConnection.current) {
      peerConnection.current.ontrack = null;
      peerConnection.current.onicecandidate = null;
      peerConnection.current.close();
      peerConnection.current = null;
    }
  
    setRemoteStream(null);
    setIsCalling(false);
    setCallAccepted(false);
    setIsReceivingCall(false);
  
    onClose();
    socket.emit("endCall", { to: contact._id });
  };
  

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IncomingCallDialog
        open={isReceivingCall}
        caller={contact}
        onAccept={answerCall}
        onReject={endCall}
      />
      <Box sx={{ p: 2, bgcolor: "#1a1a1a", color: "white" }}>
        <Box sx={{ display: "flex", gap: 2, height: "400px" }}>
          <Box sx={{ flex: 1, bgcolor: "#000" }}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box sx={{ width: "200px", bgcolor: "#000" }}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <IconButton
            onClick={toggleMute}
            sx={{ bgcolor: isMuted ? "#ef5350" : "#26A69A", color: "white" }}
          >
            {isMuted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
          <IconButton
            onClick={toggleVideo}
            sx={{ bgcolor: isVideoOff ? "#ef5350" : "#26A69A", color: "white" }}
          >
            {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
          </IconButton>
          <IconButton onClick={endCall} sx={{ bgcolor: "#ef5350", color: "white" }}>
            <CallEndIcon />
          </IconButton>
          {!isCalling && !callAccepted && (
            <IconButton onClick={startCall} sx={{ bgcolor: "#26A69A", color: "white" }}>
              <CallEndIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default VideoCallComponent;
