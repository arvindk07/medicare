
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Eye, Building2, MapPin, UserPlus, Package } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface OnboardingRecord {
  id: number;
  companyName: string;
  contactEmail: string;
  currentStep: number;
  status: "Active" | "Completed" | "Paused" | "Cancelled";
  startDate: string;
  estimatedCompletion: string;
  assignedTo: string;
  notes: string;
}

export const OnboardingCRUD = () => {
  const [onboardings, setOnboardings] = useState<OnboardingRecord[]>([
    {
      id: 1,
      companyName: "TechCorp Solutions",
      contactEmail: "contact@techcorp.com",
      currentStep: 2,
      status: "Active",
      startDate: "2024-11-15",
      estimatedCompletion: "2024-12-15",
      assignedTo: "John Smith",
      notes: "Fast-track onboarding requested"
    },
    {
      id: 2,
      companyName: "Healthcare Plus",
      contactEmail: "info@healthcareplus.com",
      currentStep: 4,
      status: "Completed",
      startDate: "2024-10-20",
      estimatedCompletion: "2024-11-20",
      assignedTo: "Sarah Johnson",
      notes: "Standard onboarding completed successfully"
    },
    {
      id: 3,
      companyName: "Finance First",
      contactEmail: "admin@financefirst.com",
      currentStep: 1,
      status: "Paused",
      startDate: "2024-11-28",
      estimatedCompletion: "2024-12-28",
      assignedTo: "Mike Davis",
      notes: "Waiting for legal documentation"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<OnboardingRecord | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactEmail: "",
    currentStep: 1,
    status: "Active" as OnboardingRecord["status"],
    startDate: "",
    estimatedCompletion: "",
    assignedTo: "",
    notes: ""
  });

  const steps = [
    { number: 1, name: "Company Registration", icon: Building2 },
    { number: 2, name: "Venue Add and Assign", icon: MapPin },
    { number: 3, name: "Create Team or Assign", icon: UserPlus },
    { number: 4, name: "Package Details", icon: Package }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      setOnboardings(onboardings.map(record => 
        record.id === editingRecord.id 
          ? { ...record, ...formData }
          : record
      ));
      toast.success("Onboarding record updated successfully");
    } else {
      const newRecord: OnboardingRecord = {
        id: onboardings.length + 1,
        ...formData
      };
      setOnboardings([...onboardings, newRecord]);
      toast.success("New onboarding record created");
    }
    setIsDialogOpen(false);
    setEditingRecord(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      contactEmail: "",
      currentStep: 1,
      status: "Active",
      startDate: "",
      estimatedCompletion: "",
      assignedTo: "",
      notes: ""
    });
  };

  const handleEdit = (record: OnboardingRecord) => {
    setEditingRecord(record);
    setFormData({
      companyName: record.companyName,
      contactEmail: record.contactEmail,
      currentStep: record.currentStep,
      status: record.status,
      startDate: record.startDate,
      estimatedCompletion: record.estimatedCompletion,
      assignedTo: record.assignedTo,
      notes: record.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setOnboardings(onboardings.filter(record => record.id !== id));
    toast.success("Onboarding record deleted");
  };

  const getStepName = (stepNumber: number) => {
    return steps.find(step => step.number === stepNumber)?.name || "Unknown";
  };

  const getStatusColor = (status: OnboardingRecord["status"]) => {
    switch (status) {
      case "Active": return "default";
      case "Completed": return "secondary";
      case "Paused": return "outline";
      case "Cancelled": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Onboarding Management</h2>
          <p className="text-muted-foreground">Manage company onboarding processes and track progress</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRecord(null);
              resetForm();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Onboarding
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRecord ? "Edit Onboarding" : "Create New Onboarding"}
              </DialogTitle>
              <DialogDescription>
                {editingRecord ? "Update onboarding information" : "Start a new company onboarding process"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Company name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    placeholder="contact@company.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentStep">Current Step</Label>
                  <Select value={formData.currentStep.toString()} onValueChange={(value) => setFormData({...formData, currentStep: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {steps.map((step) => (
                        <SelectItem key={step.number} value={step.number.toString()}>
                          Step {step.number}: {step.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as OnboardingRecord["status"]})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedCompletion">Estimated Completion</Label>
                  <Input
                    id="estimatedCompletion"
                    type="date"
                    value={formData.estimatedCompletion}
                    onChange={(e) => setFormData({...formData, estimatedCompletion: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Input
                  id="assignedTo"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                  placeholder="Team member name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional notes or comments"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRecord ? "Update" : "Create"} Onboarding
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Onboarding Records</CardTitle>
          <CardDescription>All company onboarding processes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Current Step</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onboardings.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.companyName}</div>
                      <div className="text-sm text-muted-foreground">{record.contactEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        Step {record.currentStep}
                      </Badge>
                      <span className="text-sm">{getStepName(record.currentStep)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.startDate}</TableCell>
                  <TableCell>{record.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(record)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(record.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
