import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Clock, DollarSign, Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const PatientFindTherapists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all-specialties");
  const [selectedLocation, setSelectedLocation] = useState("all-locations");

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Anxiety & Depression",
      location: "Downtown",
      rating: 4.9,
      reviewCount: 127,
      experience: "8 years",
      rate: "$120/hour",
      avatar: "/placeholder.svg",
      specialties: ["Anxiety", "Depression", "CBT"],
      nextAvailable: "Tomorrow",
      bio: "Specializing in cognitive behavioral therapy with a focus on anxiety and depression treatment."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Couples Therapy",
      location: "Midtown",
      rating: 4.8,
      reviewCount: 89,
      experience: "12 years",
      rate: "$150/hour",
      avatar: "/placeholder.svg",
      specialties: ["Couples", "Marriage", "Communication"],
      nextAvailable: "Next Week",
      bio: "Expert in relationship counseling and communication strategies for couples."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Trauma & PTSD",
      location: "Uptown",
      rating: 4.9,
      reviewCount: 156,
      experience: "10 years",
      rate: "$140/hour",
      avatar: "/placeholder.svg",
      specialties: ["Trauma", "PTSD", "EMDR"],
      nextAvailable: "This Week",
      bio: "Specialized in trauma recovery using EMDR and other evidence-based approaches."
    },
    {
      id: 4,
      name: "Dr. James Thompson",
      specialty: "Addiction Recovery",
      location: "West Side",
      rating: 4.7,
      reviewCount: 93,
      experience: "15 years",
      rate: "$130/hour",
      avatar: "/placeholder.svg",
      specialties: ["Addiction", "Recovery", "Group Therapy"],
      nextAvailable: "Today",
      bio: "Comprehensive addiction treatment with individual and group therapy options."
    }
  ];

  const specialties = ["all-specialties", "anxiety", "depression", "couples", "trauma", "addiction", "ptsd"];
  const specialtyLabels = ["All Specialties", "Anxiety", "Depression", "Couples", "Trauma", "Addiction", "PTSD"];
  
  const locations = ["all-locations", "downtown", "midtown", "uptown", "west-side", "east-side"];
  const locationLabels = ["All Locations", "Downtown", "Midtown", "Uptown", "West Side", "East Side"];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all-specialties" ||
                            therapist.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.replace("-", " ")));
    const matchesLocation = selectedLocation === "all-locations" ||
                           therapist.location.toLowerCase().replace(" ", "-") === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookSession = (therapistName: string) => {
    toast.success(`Booking request sent to ${therapistName}`);
  };

  const handleSaveTherapist = (therapistName: string) => {
    toast.success(`${therapistName} saved to your favorites`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Find Therapists</h1>
        <p className="text-gray-600">Discover qualified therapists in your area</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search therapists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty, index) => (
                  <SelectItem key={specialty} value={specialty}>{specialtyLabels[index]}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location, index) => (
                  <SelectItem key={location} value={location}>{locationLabels[index]}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="bg-green-600 hover:bg-green-700">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={therapist.avatar} alt={therapist.name} />
                  <AvatarFallback>{therapist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{therapist.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSaveTherapist(therapist.name)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardDescription className="text-sm font-medium text-green-600">
                    {therapist.specialty}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {therapist.rating} ({therapist.reviewCount})
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-gray-700 text-sm mb-4">{therapist.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {therapist.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {therapist.experience}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {therapist.rate}
                </div>
                <div className="text-green-600 font-medium">
                  Available {therapist.nextAvailable}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleBookSession(therapist.name)}
                >
                  Book Session
                </Button>
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTherapists.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg">No therapists found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
