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
    title: "therapists",
    url: "/master-panel/therapists",
  },
  {
    id: 3,
    title: "details",
    url: "",
  },
];

export const TherapistDetails = () => {
  const default_img = "/images/misc/therapist_1.jpg";
  const user_1 = "/images/misc/therapist_6.jpg";
  const user = {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "sarah@therapy.com",
    phone: "+1-555-1001",
    specialization: "Anxiety & Depression",
    experience: 8,
    rating: 4.9,
    status: "Active",
    licenseNumber: "LIC-001",
    img: user_1,
  };
  const lightColors = ["#FF8343", "#7071E8", "#227B94"];

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
              src={user?.img}
              alt=""
              className="w-full h-full object-cover border-[3px] border-white rounded-full shadow-lg"
            />
          </div>
          <div className=" mt-12 ">
            <div className="font-medium text-[2rem] mt-6">
              Name: <span className=" text-gray-600">{user.name}</span>
            </div>
            <div className="text-lg font-medium  mt-3">
              specialization:
              <span className="text-muted-foreground font-normal pl-2">
                {user.specialization}
              </span>
            </div>
            <div className="text-lg font-medium  mt-1">
              Email:
              <span className="text-muted-foreground font-normal pl-2">
                {user.email}
              </span>
            </div>
            <div className="text-lg font-medium  mt-1">
              Phone:
              <span className="text-muted-foreground font-normal pl-2">
                {user.phone}
              </span>
            </div>
            <div className="text-lg font-medium  mt-1">
              Experience:
              <span className="text-muted-foreground font-normal pl-2">
                {user.experience}
              </span>
            </div>
            <div className="text-lg font-medium  mt-1">
              License Number:
              <span className="text-muted-foreground font-normal pl-2">
                {user.licenseNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
