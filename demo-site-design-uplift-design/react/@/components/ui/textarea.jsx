import * as React from "react";
import { cn } from "@/lib/utils";
function Textarea({ className, ...props }) {
    return (<textarea data-slot="textarea" className={cn("tansition-all flex w-full rounded-form duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", "border-b-2 border-neutral-darkest-15 bg-transparent text-scheme-text placeholder:text-neutral-darkest-60 alternate:border-white-10 alternate:text-white alternate:placeholder:text-white", "min-h-8 py-2", className)} {...props}/>);
}
export { Textarea };
