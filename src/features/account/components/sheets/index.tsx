import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AccountSheet({
  title,
  description,
  children,
  content,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  content: React.ReactElement;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">{content}</div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
