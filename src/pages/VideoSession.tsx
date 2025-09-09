
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users,
  MessageCircle, 
  FileText,
  Save
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoControls } from "@/components/video/VideoControls";
import { Whiteboard } from "@/components/video/Whiteboard";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const VideoSession = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionNotes, setSessionNotes] = useState("");
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);

  useEffect(() => {
    // Simulate connection after 2 seconds
    const timer = setTimeout(() => {
      setIsConnected(true);
      toast.success("Connected to session");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.info(isVideoOn ? "Camera turned off" : "Camera turned on");
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast.info(isAudioOn ? "Microphone muted" : "Microphone unmuted");
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.info(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started");
  };

  const toggleWhiteboard = () => {
    setIsWhiteboardActive(!isWhiteboardActive);
    toast.info(isWhiteboardActive ? "Whiteboard closed" : "Whiteboard opened");
  };

  const saveNotes = () => {
    toast.success("Session notes saved");
  };

  const endCall = () => {
    toast.success("Session ended");
    window.location.href = "/therapist";
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Connecting to session...</h3>
            <p className="text-gray-600 text-sm md:text-base">Please wait while we establish the connection</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Badge variant="secondary" className="bg-green-600 text-xs md:text-sm">
            <div className="w-2 h-2 bg-white rounded-full mr-1 md:mr-2"></div>
            Connected
          </Badge>
          <span className="text-xs md:text-sm truncate">Session with Dr. Sarah Johnson</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-xs md:text-sm font-mono">{formatTime(sessionDuration)}</span>
          <Button variant="ghost" size="sm" className="text-xs md:text-sm">
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            <span className="ml-1">2</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 md:p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-4 min-h-0">
        {/* Main Video/Whiteboard Area */}
        <div className="lg:col-span-3 relative order-1 lg:order-none">
          <Card className="h-full bg-gray-800 border-gray-700">
            <CardContent className="p-0 h-full flex items-center justify-center relative">
              {isWhiteboardActive ? (
                <Whiteboard isActive={isWhiteboardActive} onClose={toggleWhiteboard} />
              ) : isScreenSharing ? (
                <div className="w-full h-full bg-blue-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-blue-400 text-4xl md:text-6xl">📺</div>
                    <p className="text-base md:text-lg">Screen Sharing Active</p>
                    <p className="text-xs md:text-sm text-gray-400">Showing screen content</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="text-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl md:text-2xl font-bold">SJ</span>
                      </div>
                      <p className="text-base md:text-lg">Dr. Sarah Johnson</p>
                      <p className="text-xs md:text-sm text-gray-400">Therapist</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-gray-400 text-4xl md:text-6xl">📹</div>
                      <p className="text-sm md:text-base">Camera is off</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Self Video (Picture in Picture) */}
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-32 h-24 md:w-48 md:h-36 bg-gray-700 rounded-lg overflow-hidden">
                {isVideoOn ? (
                  <div className="w-full h-full bg-green-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                        <span className="text-xs md:text-sm font-bold">ME</span>
                      </div>
                      <p className="text-xs">You</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="h-6 w-6 md:h-8 md:w-8 text-gray-400 text-2xl md:text-3xl">📹</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-2 md:space-y-4 order-2 lg:order-none">
          <Tabs defaultValue="chat" className="h-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="chat" className="text-xs md:text-sm">Chat</TabsTrigger>
              <TabsTrigger value="notes" className="text-xs md:text-sm">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Session Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-48 md:h-64 overflow-y-auto text-sm">
                  <div className="space-y-2">
                    <div className="bg-gray-700 p-2 rounded">
                      <p className="text-xs text-gray-400">Dr. Johnson</p>
                      <p className="text-xs md:text-sm">Welcome to our session today!</p>
                    </div>
                    <div className="bg-blue-600 p-2 rounded ml-4 md:ml-8">
                      <p className="text-xs text-gray-200">You</p>
                      <p className="text-xs md:text-sm">Thank you, looking forward to it.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Therapist Notes
                    </span>
                    <Button size="sm" variant="outline" onClick={saveNotes}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    content={sessionNotes}
                    onChange={setSessionNotes}
                    placeholder="Write session notes here..."
                    className="bg-gray-700 border-gray-600 text-white h-48 md:h-60"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Control Bar */}
      <div className="mt-auto">
        <VideoControls
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          isScreenSharing={isScreenSharing}
          isWhiteboardActive={isWhiteboardActive}
          onVideoToggle={toggleVideo}
          onAudioToggle={toggleAudio}
          onScreenShareToggle={toggleScreenShare}
          onWhiteboardToggle={toggleWhiteboard}
          onEndCall={endCall}
        />
      </div>
    </div>
  );
};

export default VideoSession;
