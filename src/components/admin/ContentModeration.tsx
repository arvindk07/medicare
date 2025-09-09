
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FileText, MessageSquare, Search, ShieldX, Star, Video } from "lucide-react";

interface ContentModerationProps {
  userRole: "admin" | "master";
}

export const ContentModeration = ({ userRole }: ContentModerationProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("therapist-profiles");
  
  const therapistProfiles = [
    {
      id: 1,
      name: "Dr. Michael Chen",
      type: "Profile",
      status: "Pending",
      submittedDate: "2024-05-20",
      flagged: false
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      type: "Intro Video",
      status: "Approved",
      submittedDate: "2024-05-15",
      flagged: false
    },
    {
      id: 3,
      name: "Dr. James Rodriguez",
      type: "License Documentation",
      status: "Rejected",
      submittedDate: "2024-05-18",
      flagged: true
    },
    {
      id: 4,
      name: "Dr. Emily Davis",
      type: "Profile",
      status: "Pending",
      submittedDate: "2024-05-22",
      flagged: false
    }
  ];
  
  const userContent = [
    {
      id: 1,
      username: "patient_123",
      type: "Review",
      content: "Review for Dr. Wilson - 5 stars",
      submittedDate: "2024-05-21",
      status: "Published"
    },
    {
      id: 2,
      username: "healing_journey",
      type: "Forum Post",
      content: "My experience with anxiety therapy...",
      submittedDate: "2024-05-19",
      status: "Flagged"
    },
    {
      id: 3,
      username: "mindful_person",
      type: "Resource Submission",
      content: "Meditation guide PDF",
      submittedDate: "2024-05-17",
      status: "Pending"
    },
    {
      id: 4,
      username: "wellness_seeker",
      type: "Community Question",
      content: "How to find the right therapist?",
      submittedDate: "2024-05-22",
      status: "Published"
    }
  ];
  
  const resourceContent = [
    {
      id: 1,
      title: "Understanding Anxiety",
      type: "Article",
      author: "Dr. Wilson",
      submittedDate: "2024-05-15",
      status: "Published"
    },
    {
      id: 2,
      title: "Mindfulness Meditation",
      type: "Audio",
      author: "Dr. Chen",
      submittedDate: "2024-05-18",
      status: "Pending"
    },
    {
      id: 3,
      title: "Cognitive Behavioral Therapy",
      type: "Video",
      author: "Dr. Rodriguez",
      submittedDate: "2024-05-20",
      status: "Flagged"
    },
    {
      id: 4,
      title: "Depression Self-Care",
      type: "PDF",
      author: "Dr. Davis",
      submittedDate: "2024-05-16",
      status: "Published"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
      case "Published":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
      case "Flagged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "Profile":
      case "License Documentation":
        return <FileText className="w-4 h-4" />;
      case "Intro Video":
      case "Video":
        return <Video className="w-4 h-4" />;
      case "Review":
        return <Star className="w-4 h-4" />;
      case "Forum Post":
      case "Community Question":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
          <p className="text-gray-600">Review and manage platform content</p>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full md:w-1/3 mb-6"
        />
      </div>
      
      <Tabs defaultValue="therapist-profiles" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="therapist-profiles">Therapist Profiles</TabsTrigger>
          <TabsTrigger value="user-content">User Content</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="therapist-profiles">
          <Card>
            <CardHeader>
              <CardTitle>Therapist Profile Verification</CardTitle>
              <CardDescription>Review and approve therapist profiles and uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Therapist</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Content Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Submitted</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {therapistProfiles
                      .filter(item => 
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${item.flagged ? 'bg-red-50' : ''}`}>
                          <td className="py-3 px-4 font-medium text-gray-900">{item.name}</td>
                          <td className="py-3 px-4 text-gray-600 flex items-center">
                            {getContentTypeIcon(item.type)}
                            <span className="ml-2">{item.type}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{item.submittedDate}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                                <ShieldX className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {therapistProfiles.filter(item => 
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.type.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No content found matching your search criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user-content">
          <Card>
            <CardHeader>
              <CardTitle>User Generated Content</CardTitle>
              <CardDescription>Moderate reviews, forum posts, and comments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Content Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Content Preview</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userContent
                      .filter(item => 
                        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{item.username}</td>
                          <td className="py-3 px-4 text-gray-600 flex items-center">
                            {getContentTypeIcon(item.type)}
                            <span className="ml-2">{item.type}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 truncate max-w-[200px]">{item.content}</td>
                          <td className="py-3 px-4 text-gray-600">{item.submittedDate}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                                <ShieldX className="w-3 h-3 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {userContent.filter(item => 
                  item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.type.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No content found matching your search criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library Moderation</CardTitle>
              <CardDescription>Manage articles, videos, and educational resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Author</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resourceContent
                      .filter(item => 
                        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{item.title}</td>
                          <td className="py-3 px-4 text-gray-600 flex items-center">
                            {getContentTypeIcon(item.type)}
                            <span className="ml-2">{item.type}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{item.author}</td>
                          <td className="py-3 px-4 text-gray-600">{item.submittedDate}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Publish
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {resourceContent.filter(item => 
                  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.type.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No resources found matching your search criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
