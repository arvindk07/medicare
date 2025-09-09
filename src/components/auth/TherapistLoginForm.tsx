
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Mail, Lock, Key } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  licenseId: z.string().optional(),
});

export const TherapistLoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      licenseId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual authentication logic
      console.log("Therapist login attempt:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Successfully logged in as Therapist");
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
        <h3 className="text-xl font-semibold">Therapist Portal</h3>
        <p className="text-sm text-gray-500">Access your client management dashboard and resources</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <FormField
            control={form.control}
            name="licenseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License ID (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input placeholder="Enter your license ID" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between items-center">
            <Label className="text-sm cursor-pointer flex items-center gap-2">
              <Input type="checkbox" className="w-4 h-4" />
              Remember me
            </Label>
            <Button variant="link" className="text-sm p-0 h-auto">Forgot password?</Button>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              New therapist?{" "}
              <Button variant="link" className="p-0 h-auto">Apply to join</Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
