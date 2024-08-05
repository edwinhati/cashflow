import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// TODO: Add the following imports open setOpen
export default function AccountDialog({
  open,
  title,
  content,
  children,
  description,
  onOpenChange,
}: {
  open: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  content: React.ReactElement;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{content}</div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
