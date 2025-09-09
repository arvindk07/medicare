import NeurowelButton from "@/components/forms/Button/NeurowelButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  employees: number;
  venues: number;
  status: "Active" | "Inactive" | "Pending";
  subscription: "Basic" | "Premium" | "Enterprise";
  joinDate: string;
}

const UploadDocForm = (props: any) => {
  const { companies, setCompanies } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    employees: 0,
    venues: 0,
    status: "Active" as "Active" | "Inactive" | "Pending",
    subscription: "Basic" as "Basic" | "Premium" | "Enterprise",
  });
  const handleSave = () => {
    const newCompany: Company = {
      id: Date.now().toString(),
      ...formData,
      joinDate: new Date().toISOString().split("T")[0],
    };
    setCompanies([...companies, newCompany]);
    toast.success("Company added successfully");
    // setIsDialogOpen(false);
  };
  return (
    <form>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Registration Number</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Company Registration Number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">GST Number</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="GST Number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Owner Name</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter Owner Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Owner Emails</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Enter Owner Emails"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employees">Employees</Label>
            <Input
              id="employees"
              type="number"
              value={formData.employees}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employees: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="venues">Venues</Label>
            <Input
              id="venues"
              type="number"
              value={formData.venues}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venues: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <NeurowelButton
            label="Back"
            icon=""
            icon_width={24}
            neurowel_click_function={handleSave}
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

export default UploadDocForm;
