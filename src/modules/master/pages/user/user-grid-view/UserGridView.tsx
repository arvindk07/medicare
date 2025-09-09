import { Edit, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const UserGridView = (props: any) => {
  const { data, handleDelete } = props;

  const lightColors = ["#A0C878", "#FF8343", "#7071E8", "#227B94"];

  const getLightColor = (id: number) => {
    return lightColors[id % lightColors.length];
  };

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((user: any) => (
        <Card
          key={user.id}
          className="hover:cursor-pointer overflow-hidden"
          onClick={() => navigate(`/master-panel/users/details/${user.id}`)}
        >
          <div
            className="h-24 rounded-t-lg px-3"
            style={{ backgroundColor: getLightColor(user.id) }}
          >
            <div className="flex justify-between items-center  pt-3">
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
              <div className="flex space-x-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-50/25 border-none h-8 w-8 rounded-full text-purple-500 hover:text-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/master-panel/users/update/${user.id}`);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-slate-50/25 border-none h-8 w-8 rounded-full text-red-500 hover:text-red-700"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  <IoTrashOutline className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-6 relative">
            <div
              className="absolute h-16 w-16  top-0 left-6 translate-y-[-50%] rounded-full border-[3px] overflow-hidden"
              style={{ borderColor: getLightColor(user.id) }}
            >
              <img
                src={user?.image}
                alt=""
                className="w-full h-full object-cover "
              />
            </div>
            <div>
              <div className="font-medium mt-6">{user.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {user.role}
              </div>
              <div className="text-sm text-gray-600 flex items-center font-medium mt-[4px]">
                <Mail className="h-3 w-3 mr-1 mt-1" />
                {user.email}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserGridView;
