import React from "react";
import { Edit, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NeurowelBreadcrumbs } from "@/components/common/Breadcrumbs/NeurowelBreadcrumbs";

const data = [
  {
    id: 1,
    title: "Home",
    url: "/master-panel",
  },
  {
    id: 2,
    title: "users",
    url: "/master-panel/users",
  },
  {
    id: 1,
    title: "details",
    url: "/master-panel/users/details/1",
  },
];

export const UserDetails = () => {
  const default_img = "/images/misc/therapist_1.jpg";
  const user_1 = "/images/misc/therapist_6.jpg";
  const user = {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    role: "Patient",
    company: "TechCorp Inc",
    status: "Active",
    joinDate: "2024-01-15",
    lastActive: "2024-12-01",
    image: user_1,
  };
  const lightColors = ["#A0C878", "#FF8343", "#7071E8", "#227B94"];

  const getLightColor = (id: number) => {
    return lightColors[id % lightColors.length];
  };
  return (
    <div>
      <div className=" bg-white rounded-lg pb-10">
        <div
          className="h-40 rounded-t-lg px-10 pt-4"
          style={{ backgroundColor: getLightColor(user.id) }}
        >
          <div className="flex justify-between items-center  pt-3">
            <NeurowelBreadcrumbs data={data} />
            <Badge
              className={` ${
                user.status === "Active"
                  ? "bg-green-500 text-green-100"
                  : user.status === "Pending"
                  ? " bg-orange-400 text-orange-100"
                  : user.status === "Inactive"
                  ? "bg-red-500 text-red-100"
                  : ""
              } `}
              variant={"default"}
            >
              {user.status}
            </Badge>
          </div>
        </div>

        <div className="p-8 relative">
          <div
            className="absolute h-28 w-28  top-0 left-8 translate-y-[-50%] rounded-full border-[6px] overflow-hidden shadow-xl"
            style={{ borderColor: getLightColor(user.id) }}
          >
            <img
              src={user?.image}
              alt=""
              className="w-full h-full object-cover border-[3px] border-white rounded-full shadow-lg"
            />
          </div>
          <div className=" mt-12 ">
            <div className="font-medium text-[2rem] mt-6">
              Name: <span className=" text-gray-600">{user.name}</span>
            </div>
            <div className="text-lg font-medium  mt-3">
              Role:
              <span className="text-muted-foreground font-normal pl-2">
                {user.role}
              </span>
            </div>
            <div className="text-lg font-medium  mt-1">
              Email:
              <span className="text-muted-foreground font-normal pl-2">
                {user.email}
              </span>
            </div>
            <div className="text-lg font-medium  mt-1">
              Join Date:
              <span className="text-muted-foreground font-normal pl-2">
                {user.joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
