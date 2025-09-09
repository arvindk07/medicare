import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Calendar,
  Search,
  Save,
  Smile,
  Meh,
  Frown,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";
import { PatientLayout } from "../components/Layout/PatientLayout";

export const PatientJournal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<number | null>(1);
  const [entryContent, setEntryContent] = useState("");
  const [moodRating, setMoodRating] = useState<number | null>(null);

  // Mock journal entries
  const journalEntries = [
    {
      id: 1,
      date: "2025-05-22",
      title: "Finding calm in the chaos",
      content:
        "Today was challenging but I remembered to use the breathing techniques Dr. Chen taught me. When the presentation at work started to make me anxious, I took a moment to breathe and center myself. It really helped!\n\nI'm proud of how I handled the situation and didn't let anxiety take over. Still working on not catastrophizing when things get stressful.",
      mood: 4,
    },
    {
      id: 2,
      date: "2025-05-20",
      title: "Difficult conversation with mom",
      content:
        "Had to set boundaries with mom today about her comments on my career choices. It was hard but I maintained my ground without getting defensive. Used the assertive communication techniques we discussed in therapy.\n\nI felt anxious before the call, but afterward I felt empowered. Progress!",
      mood: 3,
    },
    {
      id: 3,
      date: "2025-05-18",
      title: "Weekend reflection",
      content:
        "Spent the weekend practicing self-care. Did a hike on Saturday which really cleared my head. Sunday I read and journaled. Feeling more centered than I have in weeks.\n\nNoticed I'm sleeping better when I avoid screens before bed. Want to make this a consistent habit.",
      mood: 5,
    },
  ];

  const filteredEntries = journalEntries.filter((entry) => {
    return (
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentEntry = journalEntries.find(
    (entry) => entry.id === selectedEntry
  );

  // Initialize entry content when an entry is selected
  useState(() => {
    if (currentEntry) {
      setEntryContent(currentEntry.content);
      setMoodRating(currentEntry.mood);
    } else {
      setEntryContent("");
      setMoodRating(null);
    }
  });

  const handleSaveEntry = () => {
    if (!entryContent.trim()) {
      toast.error("Please enter some content for your journal entry");
      return;
    }

    if (moodRating === null) {
      toast.error("Please select a mood rating");
      return;
    }

    // In a real app, we would save this to an API
    toast.success("Journal entry saved");
  };

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setEntryContent("");
    setMoodRating(null);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4) return <Smile className="h-4 w-4 text-green-500" />;
    if (mood >= 3) return <Meh className="h-4 w-4 text-yellow-500" />;
    return <Frown className="h-4 w-4 text-red-500" />;
  };

  return (
    <PatientLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Journal</h1>
            <p className="text-gray-600">Track your thoughts and feelings</p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleNewEntry}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entries List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>My Journal Entries</CardTitle>
              <CardDescription>
                Track your thoughts and emotions
              </CardDescription>

              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search journal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedEntry === entry.id
                        ? "bg-green-50 border border-green-200"
                        : "hover:bg-gray-100 border border-transparent"
                    }`}
                    onClick={() => {
                      setSelectedEntry(entry.id);
                      setEntryContent(entry.content);
                      setMoodRating(entry.mood);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">
                            {entry.title}
                          </h3>
                          <div className="ml-2 flex-shrink-0">
                            {getMoodEmoji(entry.mood)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(entry.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredEntries.length === 0 && (
                  <div className="py-6 text-center text-gray-500">
                    <p>No entries found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Entry Editor */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {selectedEntry !== null
                      ? currentEntry?.title || "Journal Entry"
                      : "New Journal Entry"}
                  </CardTitle>
                  <CardDescription>
                    {selectedEntry !== null && currentEntry
                      ? formatDate(currentEntry.date)
                      : format(new Date(), "MMMM d, yyyy")}
                  </CardDescription>
                </div>

                {selectedEntry === null && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Today</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {selectedEntry === null && (
                <Input placeholder="Entry Title" className="mb-4" />
              )}

              <Textarea
                placeholder="Write your thoughts and feelings here..."
                value={entryContent}
                onChange={(e) => setEntryContent(e.target.value)}
                className="min-h-[300px]"
              />

              <div className="mt-6">
                <h4 className="font-medium mb-2">How are you feeling today?</h4>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant={moodRating === rating ? "default" : "outline"}
                      className={`flex-1 ${
                        moodRating === rating
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }`}
                      onClick={() => setMoodRating(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Very Low</span>
                  <span>Neutral</span>
                  <span>Very Good</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-6 flex justify-end">
              <Button
                onClick={handleSaveEntry}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PatientLayout>
  );
};
