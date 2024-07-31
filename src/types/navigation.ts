import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

export type Navigation = {
  name: string;
  href: string;
  current?: boolean;
  icon: ForwardRefExoticComponent<LucideProps>;
};
