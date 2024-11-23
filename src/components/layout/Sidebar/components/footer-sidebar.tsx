import { Separator } from "../../Separator";

export const FooterSidebar = () => {
  return (
    <footer className="h-[65px]">
      <Separator />
      <div className="flex items-center justify-between h-16 bg-background px-5">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company
        </span>
        <span className="text-sm text-muted-foreground">
          Feito na terra do sol 🌞
        </span>
      </div>
    </footer>
  );
};
