import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";

interface NeurowelButtonProps {
  type?: "button" | "submit" | "reset";
  label?: string;
  neurowel_class?: string;
  neurowel_click_function?: () => void;
  disabled?: boolean;
  neurowel_id?: string;
  icon?: string;
  icon_width?: number;
}

const NeurowelButton = ({
  type = "button",
  label = "Add Company",
  neurowel_class = "",
  neurowel_click_function,
  disabled = false,
  neurowel_id = "neurowel-button-id",
  icon = "Plus",
  icon_width = 16,
}: NeurowelButtonProps) => {
  const IconComponent = icon && LucideIcons[icon] ? LucideIcons[icon] : null;

  return (
    <Button
      id={neurowel_id}
      type={type}
      onClick={neurowel_click_function}
      disabled={disabled}
      className={`bg-blue-600 hover:bg-blue-700 border border-blue-700 text-white ${neurowel_class}`}
    >
      {IconComponent && (
        <IconComponent width={icon_width} height={icon_width} />
      )}
      {label}
    </Button>
  );
};

export default NeurowelButton;
