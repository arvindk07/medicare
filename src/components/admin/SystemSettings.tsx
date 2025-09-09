
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Globe, Lock, Mail, MessageSquare, Settings, Zap, Activity, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SystemSettingsProps {
  userRole: "admin" | "master";
}

export const SystemSettings = ({ userRole }: SystemSettingsProps) => {
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock settings state - in a real app, these would connect to backend APIs
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Mental Health Platform",
    supportEmail: "support@mentalhealthplatform.com",
    timeZone: "UTC",
    language: "en",
    maintenanceMode: false,
    registrationOpen: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: "strong",
    sessionTimeout: "30",
    dataRetentionDays: "365",
    ipFiltering: false,
    encryptionLevel: "high"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    reminderHours: "24",
    weeklyDigest: true,
    marketingEmails: false
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    googleCalendar: true,
    slack: false,
    zoom: true,
    stripe: true,
    mailchimp: false,
    fitbit: false
  });
  
  const handleGeneralSettingsChange = (key: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSecuritySettingsChange = (key: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleNotificationSettingsChange = (key: string, value: any) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const handleIntegrationSettingsChange = (key: string, value: boolean) => {
    setIntegrationSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const saveSetting = (type: string) => {
    // Mock API call
    console.log(`Saving ${type} settings...`);
    // In a real app, this would make an API call to save the settings
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>
        <Badge className="bg-blue-600 text-white">System Version: 1.2.5</Badge>
      </div>
      
      <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Zap className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Platform Settings</CardTitle>
              <CardDescription>Basic configuration for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Platform Name</Label>
                  <Input 
                    id="siteName" 
                    value={generalSettings.siteName} 
                    onChange={(e) => handleGeneralSettingsChange("siteName", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input 
                    id="supportEmail" 
                    type="email" 
                    value={generalSettings.supportEmail}
                    onChange={(e) => handleGeneralSettingsChange("supportEmail", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Default Time Zone</Label>
                  <Select 
                    value={generalSettings.timeZone} 
                    onValueChange={(value) => handleGeneralSettingsChange("timeZone", value)}
                  >
                    <SelectTrigger id="timeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select 
                    value={generalSettings.language} 
                    onValueChange={(value) => handleGeneralSettingsChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">
                      When enabled, only administrators can access the platform
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(value) => handleGeneralSettingsChange("maintenanceMode", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="registrationOpen">Open Registration</Label>
                    <p className="text-sm text-gray-500">
                      Allow new users to create accounts
                    </p>
                  </div>
                  <Switch
                    id="registrationOpen"
                    checked={generalSettings.registrationOpen}
                    onCheckedChange={(value) => handleGeneralSettingsChange("registrationOpen", value)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => saveSetting('general')}>Save General Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select 
                    value={securitySettings.passwordPolicy} 
                    onValueChange={(value) => handleSecuritySettingsChange("passwordPolicy", value)}
                  >
                    <SelectTrigger id="passwordPolicy">
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, numbers)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number" 
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecuritySettingsChange("sessionTimeout", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (days)</Label>
                  <Input 
                    id="dataRetention" 
                    type="number"
                    value={securitySettings.dataRetentionDays}
                    onChange={(e) => handleSecuritySettingsChange("dataRetentionDays", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel">Encryption Level</Label>
                  <Select 
                    value={securitySettings.encryptionLevel} 
                    onValueChange={(value) => handleSecuritySettingsChange("encryptionLevel", value)}
                  >
                    <SelectTrigger id="encryptionLevel">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high">High (HIPAA Compliant)</SelectItem>
                      <SelectItem value="highest">Highest (End-to-End)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Require 2FA for administrative access
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(value) => handleSecuritySettingsChange("twoFactorAuth", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ipFiltering">IP Filtering</Label>
                    <p className="text-sm text-gray-500">
                      Restrict admin access to specific IP addresses
                    </p>
                  </div>
                  <Switch
                    id="ipFiltering"
                    checked={securitySettings.ipFiltering}
                    onCheckedChange={(value) => handleSecuritySettingsChange("ipFiltering", value)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => saveSetting('security')}>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send email notifications for system events
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleNotificationSettingsChange("emailNotifications", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send text message notifications for important alerts
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(value) => handleNotificationSettingsChange("smsNotifications", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send browser and mobile app push notifications
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(value) => handleNotificationSettingsChange("pushNotifications", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                    <p className="text-sm text-gray-500">
                      Send weekly platform activity summary to administrators
                    </p>
                  </div>
                  <Switch
                    id="weeklyDigest"
                    checked={notificationSettings.weeklyDigest}
                    onCheckedChange={(value) => handleNotificationSettingsChange("weeklyDigest", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Marketing Communications</Label>
                    <p className="text-sm text-gray-500">
                      Send platform updates and marketing communications
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(value) => handleNotificationSettingsChange("marketingEmails", value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="reminderHours">Default Reminder Hours</Label>
                  <Input 
                    id="reminderHours" 
                    type="number" 
                    value={notificationSettings.reminderHours}
                    onChange={(e) => handleNotificationSettingsChange("reminderHours", e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Hours before appointment to send reminders</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => saveSetting('notifications')}>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Configure connections to external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center">
                    <Globe className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Google Calendar</h4>
                      <p className="text-sm text-gray-500">Calendar sync for appointments</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationSettings.googleCalendar}
                    onCheckedChange={(value) => handleIntegrationSettingsChange("googleCalendar", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-purple-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-gray-500">Team communication</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationSettings.slack}
                    onCheckedChange={(value) => handleIntegrationSettingsChange("slack", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center">
                    <Video className="h-8 w-8 text-blue-400 mr-3" />
                    <div>
                      <h4 className="font-medium">Zoom</h4>
                      <p className="text-sm text-gray-500">Video conferencing for sessions</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationSettings.zoom}
                    onCheckedChange={(value) => handleIntegrationSettingsChange("zoom", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center">
                    <Settings className="h-8 w-8 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Stripe</h4>
                      <p className="text-sm text-gray-500">Payment processing</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationSettings.stripe}
                    onCheckedChange={(value) => handleIntegrationSettingsChange("stripe", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-yellow-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Mailchimp</h4>
                      <p className="text-sm text-gray-500">Email marketing automation</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationSettings.mailchimp}
                    onCheckedChange={(value) => handleIntegrationSettingsChange("mailchimp", value)}
                  />
                </div>
                
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Fitbit</h4>
                      <p className="text-sm text-gray-500">Health data integration</p>
                    </div>
                  </div>
                  <Switch
                    checked={integrationSettings.fitbit}
                    onCheckedChange={(value) => handleIntegrationSettingsChange("fitbit", value)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => saveSetting('integrations')}>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
