
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Headphones, Search, FileText, ExternalLink, Clock, Play } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const PatientResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock resources data
  const resources = {
    recommended: [
      { 
        id: 1, 
        title: "Understanding Anxiety", 
        type: "Article",
        category: "Anxiety",
        duration: "5 min read",
        description: "Learn about the common symptoms of anxiety and how they affect your body and mind.",
        author: "Dr. Michael Chen"
      },
      { 
        id: 2, 
        title: "Breathing Techniques", 
        type: "Audio",
        category: "Stress Management",
        duration: "10 min",
        description: "Guided breathing exercises to help you manage acute anxiety and stress responses.",
        author: "Dr. Emily Wilson"
      },
      { 
        id: 3, 
        title: "Mindfulness for Beginners", 
        type: "Video",
        category: "Mindfulness",
        duration: "15 min",
        description: "An introduction to mindfulness practices for those new to meditation.",
        author: "Dr. Sarah Williams"
      }
    ],
    articles: [
      { 
        id: 4, 
        title: "The Science of Sleep", 
        type: "Article",
        category: "Sleep",
        duration: "8 min read",
        description: "Explore the latest research on how sleep affects mental health.",
        author: "Dr. James Rodriguez"
      },
      { 
        id: 5, 
        title: "Setting Healthy Boundaries", 
        type: "Article",
        category: "Relationships",
        duration: "6 min read",
        description: "Learn practical techniques for establishing and maintaining healthy boundaries.",
        author: "Dr. Maria Lopez"
      },
      { 
        id: 6, 
        title: "Understanding Cognitive Distortions", 
        type: "Article",
        category: "CBT",
        duration: "7 min read",
        description: "Identify common thought patterns that contribute to anxiety and depression.",
        author: "Dr. Michael Chen"
      }
    ],
    videos: [
      { 
        id: 7, 
        title: "Progressive Muscle Relaxation", 
        type: "Video",
        category: "Stress Management",
        duration: "12 min",
        description: "A guided video session teaching progressive muscle relaxation techniques.",
        author: "Dr. Emily Wilson"
      },
      { 
        id: 8, 
        title: "Challenging Negative Thoughts", 
        type: "Video",
        category: "CBT",
        duration: "18 min",
        description: "Learn how to identify and reframe negative thought patterns.",
        author: "Dr. Michael Chen"
      },
      { 
        id: 9, 
        title: "Morning Meditation Routine", 
        type: "Video",
        category: "Mindfulness",
        duration: "10 min",
        description: "Start your day with this calming meditation practice.",
        author: "Dr. Sarah Williams"
      }
    ],
    audio: [
      { 
        id: 10, 
        title: "Deep Sleep Relaxation", 
        type: "Audio",
        category: "Sleep",
        duration: "30 min",
        description: "A guided relaxation to help you fall asleep more easily.",
        author: "Dr. James Rodriguez"
      },
      { 
        id: 11, 
        title: "Mindful Walking Practice", 
        type: "Audio",
        category: "Mindfulness",
        duration: "15 min",
        description: "Practice mindfulness while walking with this guided audio.",
        author: "Dr. Sarah Williams"
      },
      { 
        id: 12, 
        title: "Anxiety Relief Meditation", 
        type: "Audio",
        category: "Anxiety",
        duration: "20 min",
        description: "A focused meditation to reduce feelings of anxiety.",
        author: "Dr. Michael Chen"
      }
    ]
  };

  const filterResources = (resourceList: any[]) => {
    if (!searchTerm) return resourceList;
    
    return resourceList.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getResourceIcon = (type: string) => {
    switch(type) {
      case "Article": return <FileText className="h-5 w-5 text-blue-600" />;
      case "Video": return <Video className="h-5 w-5 text-red-600" />;
      case "Audio": return <Headphones className="h-5 w-5 text-purple-600" />;
      default: return <BookOpen className="h-5 w-5 text-green-600" />;
    }
  };

  const handleOpenResource = (resource: any) => {
    toast.success(`Opening "${resource.title}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-600">Educational materials for your therapy journey</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input 
          placeholder="Search resources by title, topic, or keyword..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterResources(resources.recommended).map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                onOpen={() => handleOpenResource(resource)}
              />
            ))}
            
            {filterResources(resources.recommended).length === 0 && (
              <div className="col-span-3 py-10 text-center text-gray-500">
                <p>No resources found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="articles" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterResources(resources.articles).map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource}
                onOpen={() => handleOpenResource(resource)}
              />
            ))}
            
            {filterResources(resources.articles).length === 0 && (
              <div className="col-span-3 py-10 text-center text-gray-500">
                <p>No articles found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterResources(resources.videos).map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource}
                onOpen={() => handleOpenResource(resource)}
              />
            ))}
            
            {filterResources(resources.videos).length === 0 && (
              <div className="col-span-3 py-10 text-center text-gray-500">
                <p>No videos found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="audio" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterResources(resources.audio).map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource}
                onOpen={() => handleOpenResource(resource)}
              />
            ))}
            
            {filterResources(resources.audio).length === 0 && (
              <div className="col-span-3 py-10 text-center text-gray-500">
                <p>No audio resources found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    type: string;
    category: string;
    duration: string;
    description: string;
    author: string;
  };
  onOpen: () => void;
}

const ResourceCard = ({ resource, onOpen }: ResourceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${
        resource.type === "Article" ? "bg-blue-600" :
        resource.type === "Video" ? "bg-red-600" :
        resource.type === "Audio" ? "bg-purple-600" :
        "bg-green-600"
      }`}></div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {resource.type === "Article" ? <FileText className="h-3 w-3 mr-1" /> :
               resource.type === "Video" ? <Video className="h-3 w-3 mr-1" /> :
               <Headphones className="h-3 w-3 mr-1" />}
              {resource.type}
            </CardDescription>
          </div>
          <Badge variant="outline">{resource.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Clock className="h-3 w-3 mr-1" />
          <span>{resource.duration}</span>
        </div>
        
        <p className="text-sm text-gray-700 mb-4">{resource.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            By {resource.author}
          </div>
          
          <Button className="bg-green-600 hover:bg-green-700" onClick={onOpen}>
            {resource.type === "Article" ? (
              <>
                <ExternalLink className="h-4 w-4 mr-1" />
                Read
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                {resource.type === "Video" ? "Watch" : "Listen"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
