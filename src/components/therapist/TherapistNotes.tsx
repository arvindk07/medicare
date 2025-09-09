
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Plus, Download, Calendar, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export const TherapistNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<number | null>(1);
  const [noteContent, setNoteContent] = useState("");
  
  // Mock notes data
  const notes = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "2025-05-22",
      title: "Anxiety Management Session",
      content: "<p>Sarah reported higher anxiety levels this week due to work pressure. We reviewed breathing techniques and discussed setting boundaries at work. She showed good progress with the mindfulness exercises from last week.</p><p><strong>Next steps:</strong> Continue daily mindfulness practice. Sarah will attempt to have a conversation with her manager about workload.</p>"
    },
    {
      id: 2,
      patientName: "Michael Brown",
      date: "2025-05-20",
      title: "Initial Assessment",
      content: "<p>First session with Michael who is experiencing symptoms of depression following job loss. He reports low mood, disrupted sleep patterns, and reduced interest in previously enjoyed activities.</p><p><strong>Initial plan:</strong> Start with CBT approach. Assigned daily activity tracking and basic behavioral activation exercises.</p>"
    },
    {
      id: 3,
      patientName: "Emma Davis",
      date: "2025-05-18",
      title: "Relationship Counseling Follow-up",
      content: "<p>Emma continues to make progress in addressing communication challenges in her relationship. Reported using the communication techniques we discussed and noted positive results.</p><p><strong>Next steps:</strong> Continue practicing active listening. Will introduce conflict resolution strategies in the next session.</p>"
    }
  ];

  const filteredNotes = notes.filter(note => {
    return (
      note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentNote = notes.find(note => note.id === selectedNote);

  // Initialize note content when a note is selected
  useState(() => {
    if (currentNote) {
      setNoteContent(currentNote.content);
    }
  });

  const handleSaveNote = () => {
    // In a real app, we would save this to an API
    toast.success("Session notes saved");
  };
  
  const handleNewNote = () => {
    setSelectedNote(null);
    setNoteContent("");
    toast.info("Started new session note");
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Session Notes</h1>
          <p className="text-gray-600">Document and track patient progress</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewNote}>
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Search and select session notes</CardDescription>
            
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search notes..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-10"
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedNote === note.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-100 border border-transparent'
                  }`}
                  onClick={() => {
                    setSelectedNote(note.id);
                    setNoteContent(note.content);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{note.title}</h3>
                      <div className="text-sm text-gray-600">
                        <span className="truncate block">{note.patientName}</span>
                        <span>{formatDate(note.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredNotes.length === 0 && (
                <div className="py-6 text-center text-gray-500">
                  <p>No notes found matching your search.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Note Editor */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>
              {selectedNote 
                ? currentNote?.title || "Session Notes" 
                : "New Session Note"
              }
            </CardTitle>
            <CardDescription>
              {selectedNote && currentNote
                ? `${currentNote.patientName} • ${formatDate(currentNote.date)}`
                : "Create a new session note"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {selectedNote === null && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Patient Name" />
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <Input 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <Input 
                  className="md:col-span-2" 
                  placeholder="Note Title"
                />
              </div>
            )}
            
            <RichTextEditor
              content={noteContent}
              onChange={setNoteContent}
              placeholder="Enter your session notes here..."
              className="min-h-[300px]"
            />
            
            <div className="flex justify-between mt-4 pt-4 border-t">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={handleSaveNote}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
