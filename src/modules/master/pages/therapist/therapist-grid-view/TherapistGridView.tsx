import { Edit, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const TherapistGridView = (props: any) => {
  const { data, handleDelete } = props;
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((therapist: any) => (
        <Card
          key={therapist.id}
          className="group"
          onClick={() =>
            navigate(`/master-panel/therapists/details/${therapist.id}`)
          }
        >
          <CardContent className="p-6">
            <div className=" flex flex-col gap-4 items-center">
              <div className="h-28 w-28  rounded-full border-4 border-purple-200 overflow-hidden shadow-md">
                <img
                  src={therapist.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium group-hover:text-purple-600">
                  {therapist.name}
                </div>
                <div className="text-sm text-muted-foreground flex items-center text-center mt-1">
                  {therapist.specialization}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 border-t-[1px] pt-4">
              <Badge
                className={` ${
                  therapist.status === "Active"
                    ? "bg-green-500 text-green-100"
                    : therapist.status === "Pending"
                    ? " bg-orange-400 text-orange-100"
                    : therapist.status === "Inactive"
                    ? "bg-red-500 text-red-100"
                    : ""
                } `}
                variant={"default"}
              >
                {therapist.status}
              </Badge>
              <div className="flex space-x-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/master-panel/therapists/update/${therapist.id}`);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(therapist.id)}
                >
                  <IoTrashOutline className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TherapistGridView;
