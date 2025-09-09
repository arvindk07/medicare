
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Shield, Crown, User, Building, Mail, Lock } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link, useNavigate } from "react-router-dom";
import { getTenantType } from "@/utils/subdomainUtils";

const TenantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const tenantType = getTenantType();

  const tenantConfig = {
    organization: {
      title: "Organization Portal",
      description: "Employee wellness management",
      icon: Building,
      color: "purple",
      redirectPath: "/organization"
    },
    patient: {
      title: "Patient Portal", 
      description: "Access your therapy sessions",
      icon: User,
      color: "blue",
      redirectPath: "/patient"
    },
    therapist: {
      title: "Therapist Portal",
      description: "Manage your practice",
      icon: Brain,
      color: "green", 
      redirectPath: "/therapist"
    },
    master: {
      title: "Master Panel",
      description: "System administration",
      icon: Crown,
      color: "purple",
      redirectPath: "/master-panel"
    },
    main: {
      title: "Mental Health Platform",
      description: "Choose your access portal",
      icon: Shield,
      color: "blue",
      redirectPath: "/"
    }
  };

  const config = tenantConfig[tenantType as keyof typeof tenantConfig] || tenantConfig.main;

  useEffect(() => {
    if (tenantType === 'main') {
      navigate('/');
    }
  }, [tenantType, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Logged in to ${config.title}`);
      navigate(config.redirectPath);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-${config.color}-50 to-${config.color}-100 p-6`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`p-3 bg-${config.color}-600 rounded-full`}>
              <config.icon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
          <p className="text-gray-600">{config.description}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className={`h-5 w-5 text-${config.color}-600`} />
              Secure Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the {config.title.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className={`w-full bg-${config.color}-600 hover:bg-${config.color}-700`} 
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : `Access ${config.title}`}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-sm">
                Forgot password?
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="outline">
              Back to Main Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;
