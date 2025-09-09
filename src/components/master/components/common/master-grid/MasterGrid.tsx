import { Edit, MapPin, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const MasterGrid = (props: any) => {
  const { data, handleDelete } = props;

  const navigate = useNavigate();

  const default_img = "/images/misc/default_company_2.jpg";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((company: any) => (
        <Card
          key={company.id}
          className="group hover:cursor-pointer"
          onClick={() =>
            navigate(`/master-panel/organization/details/${company.id}`)
          }
        >
          <div className="relative h-[12rem] w-full rounded-t-lg overflow-hidden">
            <img
              src={company.img ? company.img : default_img}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Badge
              className={`absolute top-2 right-2  ${
                company.status === "Active"
                  ? "bg-green-500 text-green-100"
                  : company.status === "Pending"
                  ? " bg-orange-400 text-orange-100"
                  : company.status === "Pending"
                  ? "bg-red-500 text-red-100"
                  : ""
              } `}
              variant={"default"}
            >
              {company.status}
            </Badge>
            <div className="flex space-x-2 justify-end absolute bottom-2 right-2">
              <Button
                className=" bg-black/50 border-black/50 rounded-full w-10 h-10 hover:bg-black/80 group"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/master-panel/organization/update/${company.id}`);
                }}
              >
                <Edit className="h-4 w-4 text-purple-500 group-hover:text-white" />
              </Button>
              <Button
                className=" bg-black/50 border-black/50 rounded-full w-10 h-10 hover:bg-black/80 group"
                variant="outline"
                size="sm"
                onClick={() => handleDelete(company.id)}
              >
                <IoTrashOutline className="h-4 w-4 text-red-500 group-hover:text-red-700" />
              </Button>
            </div>
          </div>
          <CardContent className="p-6">
            <div>
              <div className="font-medium group-hover:text-purple-700">
                {company.name}
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                {company.address}
              </div>
            </div>
            <div>
              <div className="text-sm flex items-center mt-1">
                <Mail className="h-4 w-4 mr-2 text-purple-500" />
                {company.email}
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Phone className="h-4 w-4 mr-2 text-purple-500" />
                {company.phone}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MasterGrid;
