
import { useParams } from "react-router-dom";
import { DynamicForm } from "@/components/forms/DynamicForm";

const FormViewer = () => {
  const { formId } = useParams<{ formId: string }>();
  
  // Mock form data - in real app this would come from API
  const formConfigs = {
    'intake-form': {
      title: "Patient Intake Form",
      description: "Please provide your basic information for our records",
      fields: [
        { id: 'firstName', type: 'text' as const, label: 'First Name', required: true },
        { id: 'lastName', type: 'text' as const, label: 'Last Name', required: true },
        { id: 'email', type: 'email' as const, label: 'Email Address', required: true },
        { id: 'phone', type: 'text' as const, label: 'Phone Number' },
        { id: 'dob', type: 'date' as const, label: 'Date of Birth', required: true },
        { id: 'gender', type: 'select' as const, label: 'Gender', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
        { id: 'concerns', type: 'textarea' as const, label: 'What brings you to therapy today?', placeholder: 'Describe your main concerns...' },
        { id: 'previousTherapy', type: 'radio' as const, label: 'Have you been in therapy before?', options: ['Yes', 'No'] },
        { id: 'consent', type: 'checkbox' as const, label: 'I consent to treatment and understand the privacy policy', required: true }
      ]
    },
    'consent-form': {
      title: "Therapy Consent Form",
      description: "Please read and agree to the terms of therapy",
      fields: [
        { id: 'clientName', type: 'text' as const, label: 'Client Full Name', required: true },
        { id: 'date', type: 'date' as const, label: 'Date', required: true },
        { id: 'understandRisks', type: 'checkbox' as const, label: 'I understand the potential risks and benefits of therapy', required: true },
        { id: 'confidentialityAgreement', type: 'checkbox' as const, label: 'I understand the limits of confidentiality', required: true },
        { id: 'paymentAgreement', type: 'checkbox' as const, label: 'I agree to the payment terms and cancellation policy', required: true },
        { id: 'consentToTreatment', type: 'checkbox' as const, label: 'I consent to participate in therapy services', required: true },
        { id: 'signature', type: 'text' as const, label: 'Digital Signature (Type your full name)', required: true }
      ]
    }
  };

  const formConfig = formConfigs[formId as keyof typeof formConfigs];

  if (!formConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Not Found</h2>
          <p className="text-gray-600">The requested form does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <DynamicForm
        formId={formId!}
        title={formConfig.title}
        description={formConfig.description}
        fields={formConfig.fields}
      />
    </div>
  );
};

export default FormViewer;
