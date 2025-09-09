import NeurowelButton from "@/components/forms/Button/NeurowelButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const TherapistMouForm = ({ companies, setCompanies }: any) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    signatoryName: "",
    signatoryDesignation: "",
    companyEmail: "",
    companyPhone: "",
    agreementDate: "",
    purpose: "",
    scope: "",
    duration: "",
    terms: "",
  });

  const handleSave = () => {
    // Simple validation
    if (
      !formData.companyName ||
      !formData.signatoryName ||
      !formData.agreementDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setCompanies([
      ...companies,
      {
        id: Date.now().toString(),
        ...formData,
        joinDate: formData.agreementDate,
      },
    ]);
    toast.success("MOU details saved successfully");
  };

  return (
    <form>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              placeholder="Enter Company Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Input
              id="companyAddress"
              value={formData.companyAddress}
              onChange={(e) =>
                setFormData({ ...formData, companyAddress: e.target.value })
              }
              placeholder="Enter Company Address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signatoryName">Authorized Signatory Name</Label>
            <Input
              id="signatoryName"
              value={formData.signatoryName}
              onChange={(e) =>
                setFormData({ ...formData, signatoryName: e.target.value })
              }
              placeholder="Enter Signatory Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signatoryDesignation">Designation</Label>
            <Input
              id="signatoryDesignation"
              value={formData.signatoryDesignation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  signatoryDesignation: e.target.value,
                })
              }
              placeholder="Enter Designation"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyEmail">Company Email</Label>
            <Input
              id="companyEmail"
              value={formData.companyEmail}
              onChange={(e) =>
                setFormData({ ...formData, companyEmail: e.target.value })
              }
              placeholder="Enter Email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyPhone">Company Phone</Label>
            <Input
              id="companyPhone"
              value={formData.companyPhone}
              onChange={(e) =>
                setFormData({ ...formData, companyPhone: e.target.value })
              }
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="agreementDate">Date of Agreement</Label>
            <Input
              id="agreementDate"
              type="date"
              value={formData.agreementDate}
              onChange={(e) =>
                setFormData({ ...formData, agreementDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose of MOU</Label>
          <Textarea
            id="purpose"
            value={formData.purpose}
            onChange={(e) =>
              setFormData({ ...formData, purpose: e.target.value })
            }
            placeholder="Describe the purpose of the MOU"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scope">Scope of Work / Services</Label>
          <Textarea
            id="scope"
            value={formData.scope}
            onChange={(e) =>
              setFormData({ ...formData, scope: e.target.value })
            }
            placeholder="Define the scope of the agreement"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration of Agreement</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            placeholder="e.g. 1 year, 3 years, etc."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="terms">Terms & Conditions</Label>
          <Textarea
            id="terms"
            value={formData.terms}
            onChange={(e) =>
              setFormData({ ...formData, terms: e.target.value })
            }
            placeholder="Mention any terms and conditions"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <NeurowelButton
            label="Back"
            icon=""
            icon_width={24}
            neurowel_click_function={() => console.log("Back")}
            neurowel_class="rounded-full border-2 bg-transparent text-purple-700 w-[6rem] border-purple-700 hover:bg-purple-700 hover:text-white"
          />
          <NeurowelButton
            label="Save"
            icon="Plus"
            icon_width={24}
            neurowel_click_function={handleSave}
            neurowel_class="rounded-full border-2 bg-purple-700 border-purple-700 hover:bg-purple-700 hover:text-white min-w-[6rem]"
          />
        </div>
      </div>
    </form>
  );
};

export default TherapistMouForm;
