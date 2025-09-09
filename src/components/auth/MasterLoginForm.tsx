
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Building, Lock, Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  organizationId: z.string().min(1, { message: "Please select an organization" }),
});

export const MasterLoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock organizations data
  const organizations = [
    { id: "org1", name: "Acme Wellness Center" },
    { id: "org2", name: "Brightpath Mental Health" },
    { id: "org3", name: "Corporate Wellness Solutions" },
    { id: "org4", name: "University Counseling Services" },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      organizationId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual authentication logic
      console.log("Master login attempt:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the organization name for the toast message
      const org = organizations.find(o => o.id === values.organizationId);
      
      toast.success(`Successfully logged into ${org?.name || "your organization"}`);
      navigate("/");
      
      // In a real app, you would set the user role in state/context here
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Master Panel (B2B)</h3>
        <p className="text-sm text-gray-500">Enterprise-level access for organizations</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="organizationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your organization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input placeholder="Enter your email" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between items-center">
            <Label className="text-sm cursor-pointer flex items-center gap-2">
              <Input type="checkbox" className="w-4 h-4" />
              Remember this device
            </Label>
            <Button variant="link" className="text-sm p-0 h-auto">Forgot password?</Button>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Need an enterprise account?{" "}
              <Button variant="link" className="p-0 h-auto">Contact sales</Button>
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-xs text-center text-gray-500">
              Enterprise-level security with HIPAA compliance and advanced data protection
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
