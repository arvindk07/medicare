import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const MasterDashboardCard = (props: any) => {
  const { item } = props;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{item.title}</CardTitle>
        <CardDescription>{item.status}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <span
            className={`text-4xl font-bold  ${
              item.card_type === "primary"
                ? "text-blue-600"
                : item.card_type === "primary"
                ? "text-green-600"
                : item.card_type === "warning"
                ? "text-orange-600"
                : "text-purple-600"
            }`}
          >
            {item.total}
          </span>
          <p className="text-sm text-gray-600 mt-2">{item.sub_title}</p>
          <p
            className={`text-xs  font-medium ${
              item.card_type === "warning" ? "text-blue-600" : "text-green-600"
            }`}
          >
            {item.rate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
