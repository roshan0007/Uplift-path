"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check, CircleFull } from "relume-icons";
import { cn } from "@/lib/utils";
function RadioGroup({ children, className, ...props }) {
    return (<RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-2", className)} {...props}>
      {children}
    </RadioGroupPrimitive.Root>);
}
function RadioGroupItem({ id, className, shape = "dot", ...props }) {
    return (<RadioGroupPrimitive.Item data-slot="radio-group-item" id={id} className={cn("aspect-square size-[1.125rem] rounded-full focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", "border-2 border-neutral-darkest bg-transparent hover:bg-neutral-darkest-5 data-[state=checked]:bg-neutral-darkest data-[state=checked]:text-white alternate:border-white alternate:hover:bg-white-10 alternate:data-[state=checked]:bg-white alternate:data-[state=checked]:text-neutral-darkest", className)} {...props}>
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex items-center justify-center">
        {shape === "check" ? (<Check className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 fill-current"/>) : (<CircleFull className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current"/>)}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>);
}
export { RadioGroup, RadioGroupItem };
