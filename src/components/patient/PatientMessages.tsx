
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const PatientMessages = () => {
  const [messageText, setMessageText] = useState("");
  
  // Mock conversation data with therapist
  const conversation = [
    { id: 1, sender: "therapist", message: "Hello Sarah, how are you feeling today?", time: "10:00 AM" },
    { id: 2, sender: "patient", message: "Hi Dr. Chen! I'm doing okay today. The breathing exercises you taught me really helped with my anxiety yesterday.", time: "10:05 AM" },
    { id: 3, sender: "therapist", message: "That's wonderful to hear! I'm glad the techniques are helping. Have you been continuing with the daily mindfulness practice we discussed?", time: "10:08 AM" },
    { id: 4, sender: "patient", message: "Yes, I've been doing it every morning for about 10 minutes. It's been helping me start the day with a clearer mind.", time: "10:10 AM" },
    { id: 5, sender: "therapist", message: "Excellent! Consistency is key with mindfulness practice. How has your sleep been this week?", time: "10:12 AM" },
    { id: 6, sender: "patient", message: "It's been better, but I still had trouble falling asleep a couple of nights.", time: "10:15 AM" },
    { id: 7, sender: "therapist", message: "Let's make sure to discuss sleep strategies in our next session. In the meantime, try the progressive muscle relaxation exercise before bed. How are you feeling about our session tomorrow?", time: "10:18 AM" },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, we would send this message to an API
    toast.success("Message sent");
    setMessageText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Communicate with your therapist between sessions</p>
      </div>
      
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="py-4 border-b">
          <CardTitle className="text-xl">Dr. Michael Chen</CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
          {conversation.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.sender === 'patient' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'patient' ? 'text-green-100' : 'text-gray-500'
                }`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
        
        {/* Message input */}
        <div className="p-4 border-t mt-auto">
          <div className="flex space-x-2">
            <Textarea 
              placeholder="Type your message..." 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9"
              >
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button 
                size="icon"
                className="h-9 w-9 bg-green-600 hover:bg-green-700"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
