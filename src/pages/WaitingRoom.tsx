
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Video, User, Calendar } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const WaitingRoom = () => {
  const [waitTime, setWaitTime] = useState(0);
  const [isTherapistNotified, setIsTherapistNotified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime(prev => prev + 1);
    }, 1000);

    // Auto-notify therapist after 30 seconds
    const notifyTimer = setTimeout(() => {
      setIsTherapistNotified(true);
      toast.info("Therapist has been notified of your arrival");
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(notifyTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const joinSession = () => {
    window.location.href = "/video-session";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Waiting Room</h1>
          <p className="text-gray-600">Please wait while your therapist joins the session</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Session Details</span>
              <Badge variant={isTherapistNotified ? "default" : "secondary"}>
                {isTherapistNotified ? "Therapist Notified" : "Waiting"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Licensed Therapist</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Today, 2:00 PM</p>
                  <p className="text-sm text-gray-600">50 minute session</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Waiting time:</span>
                <span className="font-mono text-lg">{formatTime(waitTime)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pre-Session Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Camera and microphone access granted</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Internet connection stable</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Privacy settings verified</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">While You Wait</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Take a moment to prepare for your session. Consider what you'd like to discuss today.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 text-left">
                  <div>
                    <p className="font-medium">Review Session Goals</p>
                    <p className="text-xs text-gray-600 mt-1">What would you like to accomplish?</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 text-left">
                  <div>
                    <p className="font-medium">Practice Breathing</p>
                    <p className="text-xs text-gray-600 mt-1">Take a few deep breaths to relax</p>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {isTherapistNotified && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">Ready to Join</h3>
              <p className="text-sm text-green-700 mb-4">
                Your therapist is ready to start the session
              </p>
              <Button onClick={joinSession} className="bg-green-600 hover:bg-green-700">
                Join Video Session
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;
