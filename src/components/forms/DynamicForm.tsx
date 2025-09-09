
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { FileText, Share2, Copy } from "lucide-react";

interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

interface DynamicFormProps {
  formId: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export const DynamicForm = ({ formId, title, description, fields }: DynamicFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Form submitted successfully!");
      console.log('Form submission:', { formId, data: formData });
    } catch (error) {
      toast.error("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareForm = () => {
    const shareUrl = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Form link copied to clipboard!");
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'date':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
      
      case 'select':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(value) => handleFieldChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'radio':
        return (
          <RadioGroup
            value={formData[field.id] || ''}
            onValueChange={(value) => handleFieldChange(field.id, value)}
          >
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <CardTitle>{title}</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={shareForm}
            className="flex items-center space-x-1"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              {field.type !== 'checkbox' && (
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              )}
              {renderField(field)}
            </div>
          ))}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
