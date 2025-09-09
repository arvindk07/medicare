import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NeurowelButton from "@/components/forms/Button/NeurowelButton";

interface Therapist {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  rating: number;
  status: "Active" | "Inactive" | "Pending";
  licenseNumber: string;
}

const AddTherapistForm = (props: any) => {
  const { therapists, setTherapists, handle_cancel } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: 0,
    licenseNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTherapist: Therapist = {
      id: therapists.length + 1,
      ...formData,
      status: "Pending",
      rating: 0,
    };
    setTherapists([...therapists, newTherapist]);
    toast.success("Therapist added successfully");

    handle_cancel();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Dr. John Doe"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@therapy.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+1-555-0123"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="specialization">Specialization</Label>
          <Select
            value={formData.specialization}
            onValueChange={(value) =>
              setFormData({ ...formData, specialization: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Anxiety & Depression">
                Anxiety & Depression
              </SelectItem>
              <SelectItem value="Family Therapy">Family Therapy</SelectItem>
              <SelectItem value="Trauma Recovery">Trauma Recovery</SelectItem>
              <SelectItem value="Addiction Recovery">
                Addiction Recovery
              </SelectItem>
              <SelectItem value="Child Psychology">Child Psychology</SelectItem>
              <SelectItem value="Couples Therapy">Couples Therapy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: parseInt(e.target.value),
                })
              }
              placeholder="5"
              required
            />
          </div>
          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  licenseNumber: e.target.value,
                })
              }
              placeholder="LIC-123"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 ">
          <NeurowelButton
            label="Cancel"
            icon=""
            icon_width={24}
            neurowel_click_function={handle_cancel}
            neurowel_class="rounded-full border-2 bg-transparent text-purple-700 w-[6rem] border-purple-700 hover:bg-purple-700 hover:text-white"
          />
          <NeurowelButton
            label="Add Therapist"
            icon="Plus"
            type="submit"
            icon_width={24}
            // neurowel_click_function={}
            neurowel_class="rounded-full border-2 bg-purple-700 border-purple-700 hover:bg-purple-700 hover:text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default AddTherapistForm;
