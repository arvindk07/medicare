
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  FileText, 
  Mail, 
  MessageSquare, 
  Phone,
  Calendar,
  CheckSquare,
  List,
  Type,
  Hash,
  Upload,
  Settings
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface FormField {
  id: string;
  type: "text" | "email" | "phone" | "textarea" | "select" | "checkbox" | "radio" | "date" | "file" | "number";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface FormTemplate {
  id: string;
  name: string;
  type: "intake" | "consent" | "campaign" | "email" | "sms" | "whatsapp";
  description: string;
  fields: FormField[];
  settings: {
    submitMessage: string;
    redirectUrl?: string;
    emailNotification?: boolean;
    smsNotification?: boolean;
  };
  status: "draft" | "published";
  createdAt: string;
}

export const FormBuilder = () => {
  const [forms, setForms] = useState<FormTemplate[]>([
    {
      id: "1",
      name: "Patient Intake Form",
      type: "intake",
      description: "Initial patient information and medical history",
      fields: [
        { id: "1", type: "text", label: "Full Name", required: true },
        { id: "2", type: "email", label: "Email Address", required: true },
        { id: "3", type: "phone", label: "Phone Number", required: true },
        { id: "4", type: "date", label: "Date of Birth", required: true },
        { id: "5", type: "textarea", label: "Medical History", required: false }
      ],
      settings: {
        submitMessage: "Thank you for submitting your intake form. We will contact you soon.",
        emailNotification: true
      },
      status: "published",
      createdAt: "2025-01-01"
    }
  ]);

  const [selectedForm, setSelectedForm] = useState<string | null>("1");
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [newFormData, setNewFormData] = useState({
    name: "",
    type: "intake" as FormTemplate["type"],
    description: ""
  });

  const fieldTypes = [
    { type: "text", label: "Text Input", icon: Type },
    { type: "email", label: "Email", icon: Mail },
    { type: "phone", label: "Phone", icon: Phone },
    { type: "textarea", label: "Text Area", icon: FileText },
    { type: "select", label: "Dropdown", icon: List },
    { type: "checkbox", label: "Checkbox", icon: CheckSquare },
    { type: "radio", label: "Radio Button", icon: CheckSquare },
    { type: "date", label: "Date Picker", icon: Calendar },
    { type: "file", label: "File Upload", icon: Upload },
    { type: "number", label: "Number", icon: Hash }
  ];

  const formTypes = [
    { value: "intake", label: "Intake Form", icon: FileText },
    { value: "consent", label: "Consent Form", icon: CheckSquare },
    { value: "campaign", label: "Campaign Form", icon: MessageSquare },
    { value: "email", label: "Email Template", icon: Mail },
    { value: "sms", label: "SMS Template", icon: MessageSquare },
    { value: "whatsapp", label: "WhatsApp Template", icon: MessageSquare }
  ];

  const currentForm = forms.find(f => f.id === selectedForm);

  const createNewForm = () => {
    const newForm: FormTemplate = {
      id: Date.now().toString(),
      name: newFormData.name,
      type: newFormData.type,
      description: newFormData.description,
      fields: [],
      settings: {
        submitMessage: "Thank you for your submission!",
        emailNotification: false
      },
      status: "draft",
      createdAt: new Date().toISOString().split('T')[0]
    };

    setForms([...forms, newForm]);
    setSelectedForm(newForm.id);
    setIsFormDialogOpen(false);
    setNewFormData({ name: "", type: "intake", description: "" });
    toast.success("New form created");
  };

  const addField = (type: FormField["type"]) => {
    if (!selectedForm) return;

    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === "select" || type === "radio" ? { options: ["Option 1", "Option 2"] } : {})
    };

    setForms(forms.map(form => 
      form.id === selectedForm 
        ? { ...form, fields: [...form.fields, newField] }
        : form
    ));

    toast.success("Field added");
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    if (!selectedForm) return;

    setForms(forms.map(form => 
      form.id === selectedForm 
        ? {
            ...form,
            fields: form.fields.map(field => 
              field.id === fieldId ? { ...field, ...updates } : field
            )
          }
        : form
    ));
  };

  const deleteField = (fieldId: string) => {
    if (!selectedForm) return;

    setForms(forms.map(form => 
      form.id === selectedForm 
        ? { ...form, fields: form.fields.filter(f => f.id !== fieldId) }
        : form
    ));

    toast.success("Field deleted");
  };

  const duplicateForm = (formId: string) => {
    const formToDuplicate = forms.find(f => f.id === formId);
    if (!formToDuplicate) return;

    const duplicatedForm: FormTemplate = {
      ...formToDuplicate,
      id: Date.now().toString(),
      name: `${formToDuplicate.name} (Copy)`,
      status: "draft"
    };

    setForms([...forms, duplicatedForm]);
    toast.success("Form duplicated");
  };

  const publishForm = (formId: string) => {
    setForms(forms.map(form => 
      form.id === formId ? { ...form, status: "published" } : form
    ));
    toast.success("Form published");
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "number":
        return (
          <Input 
            placeholder={field.placeholder || field.label} 
            disabled 
            className="w-full"
          />
        );
      case "textarea":
        return (
          <Textarea 
            placeholder={field.placeholder || field.label} 
            disabled 
            className="w-full"
          />
        );
      case "select":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" disabled />
            <label className="text-sm">{field.label}</label>
          </div>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} disabled />
                <label className="text-sm">{option}</label>
              </div>
            ))}
          </div>
        );
      case "date":
        return <Input type="date" disabled className="w-full" />;
      case "file":
        return <Input type="file" disabled className="w-full" />;
      default:
        return <div className="p-2 bg-gray-100 rounded">Field preview</div>;
    }
  };

  const getFormTypeIcon = (type: FormTemplate["type"]) => {
    const formType = formTypes.find(ft => ft.value === type);
    return formType ? formType.icon : FileText;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <FileText className="mr-2" />
            Form Builder
          </h2>
          <p className="text-muted-foreground">Create intake forms, consent forms, and communication templates</p>
        </div>
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Form
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>Choose the type of form you want to create</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="formName">Form Name</Label>
                <Input
                  id="formName"
                  value={newFormData.name}
                  onChange={(e) => setNewFormData({...newFormData, name: e.target.value})}
                  placeholder="Patient Intake Form"
                />
              </div>
              <div>
                <Label htmlFor="formType">Form Type</Label>
                <Select value={newFormData.type} onValueChange={(value: FormTemplate["type"]) => setNewFormData({...newFormData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newFormData.description}
                  onChange={(e) => setNewFormData({...newFormData, description: e.target.value})}
                  placeholder="Describe the purpose of this form"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createNewForm}>Create Form</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Forms List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {forms.map((form) => {
                const IconComponent = getFormTypeIcon(form.type);
                return (
                  <div
                    key={form.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedForm === form.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-100 border border-transparent'
                    }`}
                    onClick={() => setSelectedForm(form.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{form.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{form.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={form.status === "published" ? "default" : "secondary"} className="text-xs">
                            {form.status}
                          </Badge>
                          <span className="text-xs text-gray-400">{form.fields.length} fields</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Builder */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentForm ? `Editing: ${currentForm.name}` : "Select a form to edit"}
              </CardTitle>
              {currentForm && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateForm(currentForm.id)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => publishForm(currentForm.id)}
                    disabled={currentForm.status === "published"}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {currentForm.status === "published" ? "Published" : "Publish"}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentForm ? (
              <Tabs defaultValue="fields" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="fields">Fields</TabsTrigger>
                  <TabsTrigger value="add-fields">Add Fields</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="fields" className="space-y-4">
                  <div className="space-y-4">
                    {currentForm.fields.map((field) => (
                      <Card key={field.id} className="relative">
                        <div className="absolute top-2 right-2 flex gap-1 z-10">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingField(field);
                              setIsFieldDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteField(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline">{field.type}</Badge>
                            {field.required && <Badge variant="secondary">Required</Badge>}
                          </div>
                          <Label className="block mb-2">{field.label}</Label>
                          {renderFieldPreview(field)}
                        </CardContent>
                      </Card>
                    ))}
                    {currentForm.fields.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p>No fields added yet. Add fields from the "Add Fields" tab.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="add-fields">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {fieldTypes.map((fieldType) => (
                      <Card
                        key={fieldType.type}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => addField(fieldType.type as FormField["type"])}
                      >
                        <CardContent className="p-4 text-center">
                          <fieldType.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h3 className="font-medium text-sm">{fieldType.label}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Submit Message</Label>
                        <Textarea
                          value={currentForm.settings.submitMessage}
                          onChange={(e) => {
                            const updatedForm = {
                              ...currentForm,
                              settings: { ...currentForm.settings, submitMessage: e.target.value }
                            };
                            setForms(forms.map(f => f.id === currentForm.id ? updatedForm : f));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Redirect URL (optional)</Label>
                        <Input
                          value={currentForm.settings.redirectUrl || ""}
                          onChange={(e) => {
                            const updatedForm = {
                              ...currentForm,
                              settings: { ...currentForm.settings, redirectUrl: e.target.value }
                            };
                            setForms(forms.map(f => f.id === currentForm.id ? updatedForm : f));
                          }}
                          placeholder="https://example.com/thank-you"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="emailNotification"
                          checked={currentForm.settings.emailNotification || false}
                          onChange={(e) => {
                            const updatedForm = {
                              ...currentForm,
                              settings: { ...currentForm.settings, emailNotification: e.target.checked }
                            };
                            setForms(forms.map(f => f.id === currentForm.id ? updatedForm : f));
                          }}
                        />
                        <Label htmlFor="emailNotification">Send email notification on submission</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentForm.name}</CardTitle>
                      <p className="text-muted-foreground">{currentForm.description}</p>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        {currentForm.fields.map((field) => (
                          <div key={field.id}>
                            <Label className="block mb-2">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            {renderFieldPreview(field)}
                          </div>
                        ))}
                        <Button type="button" className="w-full" disabled>
                          Submit Form
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Select a form from the sidebar to start editing</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Field Editor Dialog */}
      <Dialog open={isFieldDialogOpen} onOpenChange={setIsFieldDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
            <DialogDescription>Customize field properties and validation</DialogDescription>
          </DialogHeader>
          {editingField && (
            <div className="space-y-4">
              <div>
                <Label>Field Label</Label>
                <Input
                  value={editingField.label}
                  onChange={(e) => setEditingField({...editingField, label: e.target.value})}
                />
              </div>
              <div>
                <Label>Placeholder</Label>
                <Input
                  value={editingField.placeholder || ""}
                  onChange={(e) => setEditingField({...editingField, placeholder: e.target.value})}
                />
              </div>
              {(editingField.type === "select" || editingField.type === "radio") && (
                <div>
                  <Label>Options (one per line)</Label>
                  <Textarea
                    value={editingField.options?.join('\n') || ""}
                    onChange={(e) => setEditingField({
                      ...editingField,
                      options: e.target.value.split('\n').filter(option => option.trim())
                    })}
                  />
                </div>
              )}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={editingField.required}
                  onChange={(e) => setEditingField({...editingField, required: e.target.checked})}
                />
                <Label htmlFor="required">Required field</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFieldDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  if (selectedForm && editingField) {
                    updateField(editingField.id, editingField);
                    setIsFieldDialogOpen(false);
                    toast.success("Field updated");
                  }
                }}>
                  Update Field
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
