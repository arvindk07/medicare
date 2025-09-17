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
    title: "organization",
    url: "/master-panel/organization",
  },
  {
    id: 3,
    title: "details",
    url: "",
  },
];

export const OrganizationDetails = () => {
  const default_img3 = "/images/misc/default_company_3.jpg";
  const default_img4 = "/images/misc/default_company_4.jpg";
  const user = {
    id: 1,
    name: "TechCorp Solutions",
    email: "admin@techcorp.com",
    phone: "+1-555-0123",
    address: "123 Tech Street, San Francisco, CA",
    employees: 250,
    venues: 3,
    status: "Active",
    subscription: "Enterprise",
    joinDate: "2024-01-15",
    img: default_img3,
    logo: "",
  };
  const lightColors = ["#FF8343", "#7071E8", "#227B94"];

  const getLightColor = (id: number) => {
    return lightColors[id % lightColors.length];
  };
  return (
    <div className=" bg-white rounded-lg pb-10">
      <div className="h-60 rounded-t-lg px-10 pt-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.img})`,
          }}
        ></div>

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: getLightColor(user.id),
            opacity: 0.8,
          }}
        ></div>

        <div className="relative z-10 flex justify-between items-center pt-3">
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
          className="absolute h-28 w-28  top-0 left-8 translate-y-[-50%] rounded-full border-[6px] overflow-hidden shadow-xl flex justify-center items-center bg-white"
          style={{ borderColor: getLightColor(user.id) }}
        >
          {user?.logo ? (
            <img
              src={user?.img}
              alt=""
              className="w-[100%] h-[100%] object-cover border-[3px] border-white rounded-full shadow-lg"
            />
          ) : (
            <span
              className="text-[54px] font-semibold text-white w-full h-full flex items-center justify-center rounded-full"
              style={{ color: getLightColor(user.id) }}
            >
              {user.name?.charAt(0)}
            </span>
          )}
        </div>
        <div className="h-12 min-w-40 bg-gray-900 absolute right-8 top-4 flex justify-end gap-2 items-center px-[5px] rounded-md">
          <div className="bg-gray-700 text-white h-[80%] px-2 flex justify-center items-center min-w-[6rem] rounded cursor-pointer">
            General Info
          </div>
          <div className="bg-gray-700 text-white h-[80%] px-2 flex justify-center items-center min-w-[6rem] rounded cursor-pointer">
            Upload Doc
          </div>
          <div className="bg-gray-700 text-white h-[80%] px-2 flex justify-center items-center min-w-[6rem] rounded cursor-pointer">
            MOU
          </div>
          <div className="bg-gray-700 text-white h-[80%] px-2 flex justify-center items-center min-w-[6rem] rounded cursor-pointer">
            Profile
          </div>
        </div>
        <div className=" mt-12 ">
          <div className="font-medium text-[2rem] mt-6">
            Name: <span className=" text-gray-600">{user.name}</span>
          </div>
          <div className="text-lg font-medium  mt-3">
            Address:
            <span className="text-muted-foreground font-normal pl-2">
              {user.address}
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
            Employees:
            <span className="text-muted-foreground font-normal pl-2">
              {user.employees}
            </span>
          </div>
          <div className="text-lg font-medium  mt-1">
            Venues:
            <span className="text-muted-foreground font-normal pl-2">
              {user.venues}
            </span>
          </div>
          <div className="text-lg font-medium  mt-1">
            subscription:
            <span className="text-muted-foreground font-normal pl-2">
              {user.subscription}
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
  );
};
