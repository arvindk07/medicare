import NeurowelButton from "@/components/forms/Button/NeurowelButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ProfileUploaderForm = () => {
  const [companyImage, setCompanyImage] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyPanCard, setCompanyPanCard] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  const handleSave = () => {
    if (!companyImage || !companyLogo || !companyPanCard) {
      toast.error("Please upload all required documents");
      return;
    }

    // You can process the uploaded files here or send to server
    toast.success("Files uploaded successfully");
  };

  return (
    <form>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyImage">Company Image</Label>
          <Input
            id="companyImage"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setCompanyImage)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyLogo">Company Logo</Label>
          <Input
            id="companyLogo"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setCompanyLogo)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyPanCard">Company PAN Card</Label>
          <Input
            id="companyPanCard"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setCompanyPanCard)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <NeurowelButton
            label="Back"
            icon=""
            icon_width={24}
            neurowel_click_function={() => console.log("Back clicked")}
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

export default ProfileUploaderForm;
