
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  Monitor, 
  Settings,
  PenTool
} from "lucide-react";

interface VideoControlsProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
  isWhiteboardActive: boolean;
  onVideoToggle: () => void;
  onAudioToggle: () => void;
  onScreenShareToggle: () => void;
  onWhiteboardToggle: () => void;
  onEndCall: () => void;
}

export const VideoControls = ({
  isVideoOn,
  isAudioOn,
  isScreenSharing,
  isWhiteboardActive,
  onVideoToggle,
  onAudioToggle,
  onScreenShareToggle,
  onWhiteboardToggle,
  onEndCall
}: VideoControlsProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  // Request camera and microphone permissions
  const requestMediaPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      toast.success("Camera and microphone access granted");
      return mediaStream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast.error("Failed to access camera or microphone. Please check permissions.");
      return null;
    }
  };

  // Handle screen sharing
  const handleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        setScreenStream(null);
      }
      onScreenShareToggle();
    } else {
      // Start screen sharing
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setScreenStream(displayStream);
        onScreenShareToggle();
        toast.success("Screen sharing started");

        // Listen for screen share end
        displayStream.getVideoTracks()[0].addEventListener('ended', () => {
          setScreenStream(null);
          onScreenShareToggle();
          toast.info("Screen sharing ended");
        });
      } catch (error) {
        console.error("Error starting screen share:", error);
        toast.error("Failed to start screen sharing");
      }
    }
  };

  // Handle video toggle
  const handleVideoToggle = async () => {
    if (!stream) {
      const mediaStream = await requestMediaPermissions();
      if (!mediaStream) return;
    }
    
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
      }
    }
    onVideoToggle();
  };

  // Handle audio toggle
  const handleAudioToggle = async () => {
    if (!stream) {
      const mediaStream = await requestMediaPermissions();
      if (!mediaStream) return;
    }
    
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn;
      }
    }
    onAudioToggle();
  };

  // Initialize media on component mount
  useEffect(() => {
    requestMediaPermissions();
    
    return () => {
      // Cleanup streams on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
      <Button
        variant={isAudioOn ? "secondary" : "destructive"}
        size="lg"
        onClick={handleAudioToggle}
        className="rounded-full w-12 h-12 p-0"
      >
        {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
      
      <Button
        variant={isVideoOn ? "secondary" : "destructive"}
        size="lg"
        onClick={handleVideoToggle}
        className="rounded-full w-12 h-12 p-0"
      >
        {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
      </Button>
      
      <Button
        variant={isScreenSharing ? "default" : "secondary"}
        size="lg"
        onClick={handleScreenShare}
        className="rounded-full w-12 h-12 p-0"
      >
        <Monitor className="h-5 w-5" />
      </Button>
      
      <Button
        variant={isWhiteboardActive ? "default" : "secondary"}
        size="lg"
        onClick={onWhiteboardToggle}
        className="rounded-full w-12 h-12 p-0"
      >
        <PenTool className="h-5 w-5" />
      </Button>
      
      <Button
        variant="secondary"
        size="lg"
        className="rounded-full w-12 h-12 p-0"
      >
        <Settings className="h-5 w-5" />
      </Button>
      
      <Button
        variant="destructive"
        size="lg"
        onClick={onEndCall}
        className="rounded-full w-12 h-12 p-0 ml-8"
      >
        <Phone className="h-5 w-5" />
      </Button>
    </div>
  );
};
