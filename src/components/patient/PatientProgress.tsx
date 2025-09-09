
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";
import { Activity, TrendingUp, Calendar, Clock } from "lucide-react";

export const PatientProgress = () => {
  // Mock data for charts
  const moodData = [
    { date: "May 1", value: 3 },
    { date: "May 5", value: 2 },
    { date: "May 10", value: 4 },
    { date: "May 15", value: 3 },
    { date: "May 20", value: 5 }
  ];
  
  const anxietyData = [
    { date: "May 1", value: 8 },
    { date: "May 5", value: 7 },
    { date: "May 10", value: 6 },
    { date: "May 15", value: 5 },
    { date: "May 20", value: 4 }
  ];
  
  const sleepData = [
    { date: "May 1", hours: 5 },
    { date: "May 5", hours: 6 },
    { date: "May 10", hours: 7 },
    { date: "May 15", hours: 7 },
    { date: "May 20", hours: 8 }
  ];
  
  const activityData = [
    { name: "Meditation", minutes: 30 },
    { name: "Journaling", minutes: 20 },
    { name: "Exercise", minutes: 45 },
    { name: "Reading", minutes: 60 },
    { name: "Therapy", minutes: 50 }
  ];
  
  const timelineEvents = [
    { date: "May 22, 2025", title: "Therapy Session", desc: "Discussed anxiety management techniques" },
    { date: "May 15, 2025", title: "Therapy Session", desc: "Reviewed progress on communication skills" },
    { date: "May 8, 2025", title: "Therapy Session", desc: "Introduced new mindfulness exercises" },
    { date: "May 1, 2025", title: "Initial Assessment", desc: "Completed initial evaluation and set therapy goals" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
          <p className="text-gray-600">Track your journey and improvement</p>
        </div>
        
        <Select defaultValue="month">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Mood Tracking
            </CardTitle>
            <CardDescription>Your mood levels over time (higher is better)</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Anxiety Levels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" />
              Anxiety Levels
            </CardTitle>
            <CardDescription>Your anxiety levels over time (lower is better)</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={anxietyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sleep Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              Sleep Tracking
            </CardTitle>
            <CardDescription>Hours of sleep per night</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Weekly Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600" />
              Weekly Activities
            </CardTitle>
            <CardDescription>Time spent on wellness activities (minutes)</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#f97316" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Treatment Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Timeline</CardTitle>
          <CardDescription>History of your therapy journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:bg-gray-200 before:h-full">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-8 pr-2">
                <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-green-600 border-2 border-white"></div>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <time className="text-sm text-gray-500">{event.date}</time>
                  <p className="mt-1 text-gray-700">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
