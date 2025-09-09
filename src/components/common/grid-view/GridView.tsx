import { Edit, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const GridView = (props: any) => {
  const { data, handleDelete } = props;

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((venue: any) => (
        <Card
          key={venue.id}
          className="hover:cursor-pointer"
          onClick={() => navigate(`/master-panel/venues/details/${venue.id}`)}
        >
          <CardContent className="p-6">
            <div>
              <div className="font-medium">{venue.name}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {venue.address}
              </div>
            </div>
            <div>
              <div className="text-sm">{venue.email}</div>
              <div className="text-sm text-muted-foreground">{venue.phone}</div>
            </div>
            <div className="flex justify-between items-center mt-4 border-t-[1px] pt-4">
              <Badge
                variant={
                  venue.status === "Active"
                    ? "default"
                    : venue.status === "Pending"
                    ? "secondary"
                    : "destructive"
                }
              >
                {venue.status}
              </Badge>
              <div className="flex space-x-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/master-panel/venues/update/${venue.id}`);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(venue.id)}
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

export default GridView;
