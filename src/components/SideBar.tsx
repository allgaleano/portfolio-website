import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";

interface SideBarProps {
  pages: {
    name: string;
    url: string;
  }[];
}

export default function SideBar({ pages }: SideBarProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden flex flex-col items-center gap-[6px] p-1"
          aria-label="Toggle navigation"
        >
            {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="w-full h-[2px] bg-muted-foreground rounded-full"></span>
            ))}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="dark:bg-background/50 dark:backdrop-blur-3xl">
        <SheetTitle />
        <SheetDescription />
        <nav className="flex flex-col justify-center text-lg gap-12 text-muted-foreground h-full p-16">
          {pages.map((page) => (
            <a
              key={page.name} 
              href={page.url}
              data-replace={page.name}
              onClick={() => setOpen(false)}
            >
              {page.name}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
