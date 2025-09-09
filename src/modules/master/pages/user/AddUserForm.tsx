import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NeurowelButton from "@/components/forms/Button/NeurowelButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Patient" | "Therapist" | "Admin" | "Organization";
  company: string;
  status: "Active" | "Inactive" | "Suspended";
  joinDate: string;
  lastActive: string;
}

const AddUserForm = (props: any) => {
  const { users, setUsers, handle_cancel } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Patient" as User["role"],
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: users.length + 1,
      ...formData,
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
    toast.success("User added successfully");
    handle_cancel();

    setFormData({ name: "", email: "", role: "Patient", company: "" });
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
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="john@company.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) =>
              setFormData({ ...formData, role: value as User["role"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Patient">Patient</SelectItem>
              <SelectItem value="Therapist">Therapist</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder="Company Name"
            required
          />
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
            label="Add user"
            icon="Plus"
            type="submit"
            icon_width={24}
            neurowel_class="rounded-full border-2 bg-purple-700 border-purple-700 hover:bg-purple-700 hover:text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
