
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Calendar, Smile, Meh, Frown, TrendingUp, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/sonner";

export const PatientMoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const moodData = [
    { date: "May 15", mood: 3, note: "Feeling okay" },
    { date: "May 16", mood: 4, note: "Good day at work" },
    { date: "May 17", mood: 2, note: "Stressed about meeting" },
    { date: "May 18", mood: 5, note: "Great therapy session" },
    { date: "May 19", mood: 4, note: "Relaxing weekend" },
    { date: "May 20", mood: 3, note: "Normal day" },
    { date: "May 21", mood: 4, note: "Productive morning" },
  ];

  const recentEntries = [
    {
      id: 1,
      date: "2025-05-21",
      mood: 4,
      note: "Had a productive morning. Completed all my tasks and felt accomplished.",
      tags: ["productive", "accomplished", "work"]
    },
    {
      id: 2,
      date: "2025-05-20",
      mood: 3,
      note: "Average day. Nothing particularly good or bad happened.",
      tags: ["neutral", "routine"]
    },
    {
      id: 3,
      date: "2025-05-19",
      mood: 5,
      note: "Wonderful day! Spent time with family and felt very connected.",
      tags: ["family", "connection", "joy"]
    }
  ];

  const moodOptions = [
    { value: 1, label: "Very Low", color: "text-red-500", icon: Frown },
    { value: 2, label: "Low", color: "text-orange-500", icon: Frown },
    { value: 3, label: "Neutral", color: "text-yellow-500", icon: Meh },
    { value: 4, label: "Good", color: "text-green-500", icon: Smile },
    { value: 5, label: "Excellent", color: "text-emerald-500", icon: Smile },
  ];

  const moodTags = [
    "happy", "sad", "anxious", "calm", "stressed", "excited", "tired", "energetic",
    "grateful", "frustrated", "content", "worried", "confident", "lonely", "loved"
  ];

  const handleSaveMood = () => {
    if (selectedMood === null) {
      toast.error("Please select a mood rating");
      return;
    }

    toast.success("Mood entry saved successfully");
    setSelectedMood(null);
    setMoodNote("");
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4) return <Smile className="h-4 w-4 text-green-500" />;
    if (mood >= 3) return <Meh className="h-4 w-4 text-yellow-500" />;
    return <Frown className="h-4 w-4 text-red-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return "#10b981";
    if (mood >= 3) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
        <p className="text-gray-600">Track your daily mood and emotions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Mood Entry */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2 text-green-600" />
              Today's Mood
            </CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mood Selection */}
            <div>
              <h4 className="font-medium mb-3">Rate your mood (1-5)</h4>
              <div className="grid grid-cols-1 gap-2">
                {moodOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Button
                      key={option.value}
                      variant={selectedMood === option.value ? "default" : "outline"}
                      className={`justify-start h-12 ${
                        selectedMood === option.value 
                          ? "bg-green-600 hover:bg-green-700" 
                          : ""
                      }`}
                      onClick={() => setSelectedMood(option.value)}
                    >
                      <Icon className={`h-4 w-4 mr-2 ${option.color}`} />
                      <span>{option.value} - {option.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Mood Tags */}
            <div>
              <h4 className="font-medium mb-3">How do you feel? (Optional)</h4>
              <div className="flex flex-wrap gap-2">
                {moodTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <h4 className="font-medium mb-2">Notes (Optional)</h4>
              <Textarea
                placeholder="What happened today? How are you feeling?"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button 
              onClick={handleSaveMood} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Mood Entry
            </Button>
          </CardContent>
        </Card>

        {/* Mood Chart and Recent Entries */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mood Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Mood Trends (Last 7 Days)
              </CardTitle>
              <CardDescription>Track your mood patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 5]} />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `Mood: ${value}`,
                        props.payload.note
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Mood Entries</CardTitle>
              <CardDescription>Your mood journal history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getMoodEmoji(entry.mood)}
                        <span className="font-medium">
                          Mood: {entry.mood}/5
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(entry.date), "MMM d, yyyy")}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{entry.note}</p>
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
