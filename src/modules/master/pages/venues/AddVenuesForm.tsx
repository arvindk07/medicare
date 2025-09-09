import NeurowelButton from "@/components/forms/Button/NeurowelButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  capacity: number;
  companyId: string;
  companyName: string;
  status: "Active" | "Inactive" | "Maintenance";
}

const AddVenuesForm = (props: any) => {
  const { venues, setVenues, close_modal_function } = props;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    capacity: 0,
    companyName: "",
    status: "Active" as "Active" | "Inactive" | "Maintenance",
  });

  const handleSave = () => {
    const newVenue: Venue = {
      id: Date.now().toString(),
      companyId: Date.now().toString(),
      ...formData,
    };
    setVenues([...venues, newVenue]);
    toast.success("Venue added successfully");
    close_modal_function();
  };

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Venue Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter venue name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="Enter company name"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Enter city"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            placeholder="Enter state"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            placeholder="Enter zip code"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                capacity: parseInt(e.target.value) || 0,
              })
            }
            placeholder="Enter capacity"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <NeurowelButton
          label="Cancel"
          icon=""
          icon_width={24}
          neurowel_click_function={close_modal_function}
          neurowel_class="rounded-full border-2 bg-transparent text-purple-700 w-[6rem] border-purple-700 hover:bg-purple-700 hover:text-white"
        />
        <NeurowelButton
          label="Add Venue"
          icon="Plus"
          icon_width={24}
          neurowel_click_function={handleSave}
          neurowel_class="rounded-full border-2 bg-purple-700 border-purple-700 hover:bg-purple-700 hover:text-white"
        />
      </div>
    </form>
  );
};

export default AddVenuesForm;
