
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, Settings, Users, CheckCircle, Clock, AlertCircle, Building2, MapPin, UserPlus, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const OnboardingFlow = () => {
  const onboardingSteps = [
    { 
      id: 1, 
      title: "Company Registration", 
      description: "Initial company setup, verification, and basic information collection", 
      status: "Active", 
      duration: "2-3 days",
      icon: Building2,
      details: ["Company profile creation", "Legal verification", "Contact information", "Business documentation"]
    },
    { 
      id: 2, 
      title: "Venue Add and Assign", 
      description: "Add company locations and assign them to the organization", 
      status: "Active", 
      duration: "1-2 days",
      icon: MapPin,
      details: ["Location registration", "Venue configuration", "Address verification", "Facility setup"]
    },
    { 
      id: 3, 
      title: "Create Team or Assign from Existing", 
      description: "Set up team structure based on roles and responsibilities", 
      status: "Pending", 
      duration: "2-3 days",
      icon: UserPlus,
      details: ["Role definition", "Team member assignment", "Permission setup", "Hierarchy establishment"]
    },
    { 
      id: 4, 
      title: "Package Details", 
      description: "Configure service packages and subscription details", 
      status: "Pending", 
      duration: "1-2 days",
      icon: Package,
      details: ["Service package selection", "Pricing configuration", "Feature enablement", "Billing setup"]
    }
  ];

  const automationRules = [
    { id: 1, trigger: "Company Registration Complete", action: "Send venue setup instructions", status: "Active" },
    { id: 2, trigger: "Venue Added", action: "Initiate team creation workflow", status: "Active" },
    { id: 3, trigger: "Team Structure Complete", action: "Send package selection options", status: "Active" },
    { id: 4, trigger: "Package Selected", action: "Activate services and send welcome kit", status: "Pending" }
  ];

  const activeOnboardings = [
    {
      id: 1,
      company: "NewTech Solutions",
      currentStep: "Venue Add and Assign",
      progress: 50,
      stepNumber: 2,
      estimatedCompletion: "Dec 15, 2024"
    },
    {
      id: 2,
      company: "FinanceFirst Corp",
      currentStep: "Package Details",
      progress: 75,
      stepNumber: 4,
      estimatedCompletion: "Dec 10, 2024"
    },
    {
      id: 3,
      company: "Creative Agency Ltd",
      currentStep: "Company Registration",
      progress: 25,
      stepNumber: 1,
      estimatedCompletion: "Dec 20, 2024"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Workflow className="mr-2" />
            Onboarding Automation Flow
          </h2>
          <p className="text-muted-foreground">Manage automated onboarding processes and workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure Rules
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            New Onboarding
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Pipeline</CardTitle>
            <CardDescription>Standard 4-step onboarding process for new companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onboardingSteps.map((step, index) => (
                <div key={step.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-lg ${
                        step.status === "Active" ? "bg-blue-100 text-blue-600" : 
                        step.status === "Pending" ? "bg-yellow-100 text-yellow-600" : 
                        "bg-gray-100 text-gray-400"
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-lg">Step {step.id}: {step.title}</h3>
                        <Badge variant={
                          step.status === "Active" ? "default" : 
                          step.status === "Pending" ? "secondary" : "outline"
                        }>
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <div className="text-xs text-blue-600 mb-2">Duration: {step.duration}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation Rules</CardTitle>
            <CardDescription>Configured automation triggers and actions for each step</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationRules.map((rule) => (
                <div key={rule.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">Trigger: {rule.trigger}</h3>
                    <Badge variant={rule.status === "Active" ? "default" : "secondary"}>
                      {rule.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Action: {rule.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Onboardings</CardTitle>
          <CardDescription>Companies currently progressing through the onboarding pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeOnboardings.map((onboarding) => (
              <div key={onboarding.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{onboarding.company}</h3>
                    <p className="text-sm text-muted-foreground">
                      Current Step: {onboarding.currentStep}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{onboarding.progress}% Complete</div>
                    <div className="text-xs text-muted-foreground">
                      Est. completion: {onboarding.estimatedCompletion}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: Step {onboarding.stepNumber} of 4</span>
                    <span>{onboarding.progress}%</span>
                  </div>
                  <Progress value={onboarding.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Send Update</Button>
                  </div>
                  <Badge variant="outline">
                    Step {onboarding.stepNumber}/4
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Onboarding Statistics</CardTitle>
          <CardDescription>Performance metrics for the onboarding process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">28</div>
              <div className="text-sm text-blue-700">Companies This Month</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12.5</div>
              <div className="text-sm text-green-700">Avg. Days to Complete</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-sm text-purple-700">Completion Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">4.8</div>
              <div className="text-sm text-orange-700">Satisfaction Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
