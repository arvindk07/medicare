import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NeurowelModal = (props: any) => {
  const { is_open, close_function, title, desc, children, className, size } =
    props;

  // Define allowed size classes
  const sizeClasses: Record<string, string> = {
    small: "max-w-md",
    medium: "max-w-lg",
    large: "max-w-xl",
    extra_large: "max-w-2xl",
  };

  // Fallback to 2xl if size is undefined or invalid
  const resolvedSize = sizeClasses[size] || "max-w-2xl";

  return (
    <Dialog open={is_open} onOpenChange={close_function}>
      <DialogContent className={`${resolvedSize} ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default NeurowelModal;
