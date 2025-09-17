import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Users,
  Settings,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OnboardingProgress } from "@/components/common/progress/OnboardingProgress";

interface CompanyData {
  name: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  size: string;
  description: string;
  address: string;
  city: string;
  country: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
}

const steps = ["Company", "Details", "Admin", "Complete"];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    size: "",
    description: "",
    address: "",
    city: "",
    country: "",
    adminName: "",
    adminEmail: "",
    adminPhone: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateData = (field: keyof CompanyData, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Store company data (in real app, this would be an API call)
    const companies = JSON.parse(localStorage.getItem("companies") || "[]");
    const newCompany = {
      id: Date.now().toString(),
      ...companyData,
      createdAt: new Date().toISOString(),
      status: "active",
    };
    companies.push(newCompany);
    localStorage.setItem("companies", JSON.stringify(companies));

    toast({
      title: "Success!",
      description: "Company has been successfully onboarded.",
    });

    navigate("/admin");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-6">
              <Building2 className="w-12 h-12 text-brand mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Company Information</h2>
              <p className="text-muted-foreground">
                Let's start with your company basics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={companyData.name}
                  onChange={(e) => updateData("name", e.target.value)}
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <Label htmlFor="email">Company Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => updateData("email", e.target.value)}
                  placeholder="hello@acme.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => updateData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyData.website}
                  onChange={(e) => updateData("website", e.target.value)}
                  placeholder="https://acme.com"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4 animate-slide-in-right">
            <div className="text-center mb-6">
              <Users className="w-12 h-12 text-brand mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Company Details</h2>
              <p className="text-muted-foreground">
                Tell us more about your business
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={companyData.industry}
                  onValueChange={(value) => updateData("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="size">Company Size</Label>
                <Select
                  value={companyData.size}
                  onValueChange={(value) => updateData("size", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => updateData("description", e.target.value)}
                  placeholder="Brief description of your company..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={companyData.address}
                  onChange={(e) => updateData("address", e.target.value)}
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={companyData.city}
                  onChange={(e) => updateData("city", e.target.value)}
                  placeholder="New York"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate-slide-in-right">
            <div className="text-center mb-6">
              <Settings className="w-12 h-12 text-brand mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Admin Setup</h2>
              <p className="text-muted-foreground">
                Set up the primary administrator
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adminName">Admin Name *</Label>
                <Input
                  id="adminName"
                  value={companyData.adminName}
                  onChange={(e) => updateData("adminName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="adminEmail">Admin Email *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={companyData.adminEmail}
                  onChange={(e) => updateData("adminEmail", e.target.value)}
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <Label htmlFor="adminPhone">Admin Phone</Label>
                <Input
                  id="adminPhone"
                  value={companyData.adminPhone}
                  onChange={(e) => updateData("adminPhone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={companyData.country}
                  onChange={(e) => updateData("country", e.target.value)}
                  placeholder="United States"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
            <div>
              <h2 className="text-3xl font-bold text-success">All Set!</h2>
              <p className="text-muted-foreground mt-2">
                {companyData.name} has been successfully configured
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold mb-4">Company Summary:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {companyData.name}
                </p>
                <p>
                  <strong>Email:</strong> {companyData.email}
                </p>
                <p>
                  <strong>Industry:</strong> {companyData.industry}
                </p>
                <p>
                  <strong>Size:</strong> {companyData.size}
                </p>
                <p>
                  <strong>Admin:</strong> {companyData.adminName}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return companyData.name && companyData.email;
      case 1:
        return true; // Optional fields
      case 2:
        return companyData.adminName && companyData.adminEmail;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <OnboardingProgress
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Company Onboarding</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  //   variant="brand"
                  onClick={handleSubmit}
                  className="flex items-center gap-2"
                >
                  Complete Setup
                  <CheckCircle className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  //   variant="brand"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
