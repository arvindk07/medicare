
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
import { Mail, Lock, AlertTriangle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  twoFactorCode: z.string().length(6, { message: "Code must be 6 digits" }).optional(),
});

export const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      twoFactorCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // This is where you would implement your actual authentication logic
      console.log("Admin login attempt:", values);
      
      // For demo purposes, show 2FA step if not already showing
      if (!showTwoFactor) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowTwoFactor(true);
        setIsLoading(false);
        return;
      }
      
      // Simulate API call for the second step
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Successfully logged in as Administrator");
      navigate("/");
      
      // In a real app, you would set the user role in state/context
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
        <h3 className="text-xl font-semibold">Administrator Portal</h3>
        <p className="text-sm text-gray-500">Secure access to system management</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <p className="text-sm text-amber-700">
          Restricted access. Two-factor authentication required.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!showTwoFactor ? (
            <>
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
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Continue"}
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  We've sent a verification code to your email
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="twoFactorCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two-Factor Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter 6-digit code" 
                        className="text-center text-xl letter-spacing-wide"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowTwoFactor(false)}
                  className="text-sm"
                >
                  Back
                </Button>
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    toast.info("New code sent");
                  }}
                  className="text-sm"
                >
                  Resend code
                </Button>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Log In"}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};
