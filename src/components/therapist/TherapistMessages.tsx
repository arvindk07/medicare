
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, Paperclip } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const TherapistMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(1);
  const [messageText, setMessageText] = useState("");
  
  // Mock conversation data
  const patients = [
    { 
      id: 1, 
      name: "Sarah Johnson", 
      lastMessage: "Thank you for your help today, doctor.",
      time: "10:30 AM",
      unread: true
    },
    { 
      id: 2, 
      name: "Michael Brown", 
      lastMessage: "I'll try the techniques we discussed.",
      time: "Yesterday",
      unread: false
    },
    { 
      id: 3, 
      name: "Emma Davis", 
      lastMessage: "See you next week!",
      time: "Monday",
      unread: false
    },
    { 
      id: 4, 
      name: "Robert Wilson", 
      lastMessage: "I need to reschedule our appointment.",
      time: "May 10",
      unread: true
    }
  ];
  
  const conversations = {
    1: [
      { id: 1, sender: "patient", message: "Hi Dr. Chen, I wanted to check in about how I'm feeling.", time: "10:15 AM" },
      { id: 2, sender: "therapist", message: "Hello Sarah, how are the anxiety management techniques working for you?", time: "10:20 AM" },
      { id: 3, sender: "patient", message: "The breathing exercises are helping a lot. I was able to handle a stressful meeting at work yesterday.", time: "10:25 AM" },
      { id: 4, sender: "patient", message: "Thank you for your help today, doctor.", time: "10:30 AM" }
    ],
    2: [
      { id: 1, sender: "patient", message: "Dr. Chen, I tried the meditation app you recommended.", time: "Yesterday, 2:15 PM" },
      { id: 2, sender: "therapist", message: "That's excellent, Michael. How did it go?", time: "Yesterday, 3:30 PM" },
      { id: 3, sender: "patient", message: "I found it helpful. I slept better last night.", time: "Yesterday, 4:00 PM" },
      { id: 4, sender: "patient", message: "I'll try the techniques we discussed.", time: "Yesterday, 4:05 PM" }
    ],
    3: [
      { id: 1, sender: "therapist", message: "How are you feeling after our session yesterday, Emma?", time: "Monday, 10:00 AM" },
      { id: 2, sender: "patient", message: "Much better, thank you. The journaling exercise was really insightful.", time: "Monday, 11:30 AM" },
      { id: 3, sender: "therapist", message: "I'm glad to hear that. Remember to keep it up daily for best results.", time: "Monday, 12:15 PM" },
      { id: 4, sender: "patient", message: "See you next week!", time: "Monday, 12:20 PM" }
    ],
    4: [
      { id: 1, sender: "patient", message: "Hello Dr. Chen, something came up at work.", time: "May 10, 9:15 AM" },
      { id: 2, sender: "therapist", message: "Hi Robert, is everything okay?", time: "May 10, 9:30 AM" },
      { id: 3, sender: "patient", message: "Yes, but I need to reschedule our appointment.", time: "May 10, 9:35 AM" }
    ]
  };

  const filteredPatients = patients.filter(patient => {
    return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentConversation = conversations[selectedPatient as keyof typeof conversations] || [];

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
        <p className="text-gray-600">Communicate securely with your patients</p>
      </div>
      
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-3 h-[600px]">
          {/* Patient list sidebar */}
          <div className="border-r">
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search conversations..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="pl-10"
                />
              </div>
              
              <div className="overflow-y-auto h-[500px]">
                {filteredPatients.map((patient) => (
                  <div 
                    key={patient.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPatient === patient.id 
                        ? 'bg-blue-50' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="font-medium text-blue-700">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        {patient.unread && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{patient.name}</h3>
                          <span className="text-xs text-gray-500">{patient.time}</span>
                        </div>
                        <p className={`text-sm truncate ${patient.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                          {patient.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredPatients.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    <p>No conversations found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Chat area */}
          <div className="md:col-span-2 flex flex-col">
            {selectedPatient ? (
              <>
                <div className="p-4 border-b">
                  <h3 className="font-medium">
                    {patients.find(p => p.id === selectedPatient)?.name || "Select a conversation"}
                  </h3>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentConversation.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === 'therapist' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'therapist' ? 'text-blue-100' : 'text-gray-500'
                        }`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t">
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
                        className="h-9 w-9"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
