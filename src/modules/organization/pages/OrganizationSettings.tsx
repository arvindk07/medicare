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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Bell, Shield, Users, Mail, Calendar } from "lucide-react";
import { OrganizationLayout } from "../components/layout/OrganizationLayout";

export const OrganizationSettings = () => {
  return (
    <OrganizationLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Organization Settings
            </h1>
            <p className="text-gray-600">
              Configure your organization's wellness program settings
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic organization information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" defaultValue="Acme Corporation" />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="technology">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Organization Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your organization"
                    defaultValue="A leading technology company focused on innovation and employee wellbeing."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">
                          Pacific Standard Time
                        </SelectItem>
                        <SelectItem value="mst">
                          Mountain Standard Time
                        </SelectItem>
                        <SelectItem value="cst">
                          Central Standard Time
                        </SelectItem>
                        <SelectItem value="est">
                          Eastern Standard Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">
                          CAD - Canadian Dollar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Session Settings
                </CardTitle>
                <CardDescription>
                  Configure default session and booking settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session-duration">
                      Default Session Duration (minutes)
                    </Label>
                    <Input
                      id="session-duration"
                      type="number"
                      defaultValue="60"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-participants">
                      Max Participants per Group Session
                    </Label>
                    <Input
                      id="max-participants"
                      type="number"
                      defaultValue="20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking-window">
                      Booking Window (days ahead)
                    </Label>
                    <Input
                      id="booking-window"
                      type="number"
                      defaultValue="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cancellation">
                      Cancellation Policy (hours before)
                    </Label>
                    <Input id="cancellation" type="number" defaultValue="24" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approve">
                        Auto-approve session bookings
                      </Label>
                      <p className="text-sm text-gray-500">
                        Automatically approve employee session requests
                      </p>
                    </div>
                    <Switch id="auto-approve" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="waitlist">
                        Enable waitlists for full sessions
                      </Label>
                      <p className="text-sm text-gray-500">
                        Allow employees to join waitlists
                      </p>
                    </div>
                    <Switch id="waitlist" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how and when to send notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="session-reminders">
                        Session reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send reminders before scheduled sessions
                      </p>
                    </div>
                    <Switch id="session-reminders" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest">
                        Weekly wellness digest
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send weekly engagement summaries
                      </p>
                    </div>
                    <Switch id="weekly-digest" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="booking-confirmations">
                        Booking confirmations
                      </Label>
                      <p className="text-sm text-gray-500">
                        Confirm when sessions are booked or cancelled
                      </p>
                    </div>
                    <Switch id="booking-confirmations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="monthly-reports">
                        Monthly reports to managers
                      </Label>
                      <p className="text-sm text-gray-500">
                        Send department wellness reports to managers
                      </p>
                    </div>
                    <Switch id="monthly-reports" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reminder-time">Send reminders</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="6">6 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Employee Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="self-booking">Self-service booking</Label>
                      <p className="text-sm text-gray-500">
                        Allow employees to book their own sessions
                      </p>
                    </div>
                    <Switch id="self-booking" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-edit">Profile editing</Label>
                      <p className="text-sm text-gray-500">
                        Let employees update their profiles
                      </p>
                    </div>
                    <Switch id="profile-edit" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="feedback">Session feedback</Label>
                      <p className="text-sm text-gray-500">
                        Collect feedback after sessions
                      </p>
                    </div>
                    <Switch id="feedback" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-encryption">Data encryption</Label>
                      <p className="text-sm text-gray-500">
                        Encrypt sensitive data
                      </p>
                    </div>
                    <Switch id="data-encryption" defaultChecked disabled />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logs">Audit logging</Label>
                      <p className="text-sm text-gray-500">
                        Log all system activities
                      </p>
                    </div>
                    <Switch id="audit-logs" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymize">Anonymize reports</Label>
                      <p className="text-sm text-gray-500">
                        Remove personal identifiers from reports
                      </p>
                    </div>
                    <Switch id="anonymize" defaultChecked />
                  </div>
                </div>

                <div>
                  <Label htmlFor="data-retention">Data retention period</Label>
                  <Select defaultValue="2-years">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-year">1 year</SelectItem>
                      <SelectItem value="2-years">2 years</SelectItem>
                      <SelectItem value="5-years">5 years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Support & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" defaultValue="wellness@acme.com" />
                </div>

                <div>
                  <Label htmlFor="hr-contact">HR Contact</Label>
                  <Input id="hr-contact" defaultValue="hr@acme.com" />
                </div>

                <div>
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input id="emergency" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="pt-4">
                  <Button className="w-full" variant="outline">
                    Test Email Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </OrganizationLayout>
  );
};
