import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
/*
 * Deviation from the v2 Relume export, deliberate: the export's `default` variant
 * shipped `btn-light:` classes (which no section uses) but dropped the `btn-dark:`
 * ones, while all eleven `cta-25` banners still carry the `.btn-dark` section
 * class. Without them the CTA button renders green-on-green on the green
 * `.scheme-2` fill. The design system documents the variant as "black fill, used
 * for the CTA button on green .scheme-accent banners", and Relume's own render
 * (design-export/screenshots/08-take-away-new.png) shows it black with white
 * label and no ledge. Restored to that.
 */
const buttonVariants = cva("inline-flex items-center justify-center gap-3 rounded-button whitespace-nowrap transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-2 border-caribbean-green-dark bg-caribbean-green font-medium text-scheme-btn-text shadow-[0_3px_0_0_var(--color-caribbean-green-dark)] hover:translate-y-[3px] hover:shadow-none btn-light:border-neutral-lighter btn-light:bg-white btn-light:text-neutral-darkest btn-light:shadow-[0_3px_0_0_var(--color-neutral-lighter)] btn-light:hover:shadow-none btn-dark:border-neutral-darkest btn-dark:bg-neutral-darkest btn-dark:text-white btn-dark:shadow-none btn-dark:hover:translate-y-0",
            alternate: "border-2 border-neutral-lighter bg-white font-medium text-neutral-darkest shadow-[0_3px_0_0_var(--color-neutral-lighter)] hover:shadow-none",
            secondary: "border-2 border-neutral-darkest bg-transparent font-medium shadow-[0_3px_0_0_var(--color-neutral-darkest)] hover:translate-y-[3px] hover:shadow-none alternate:border-white alternate:bg-transparent alternate:text-white alternate:shadow-[0_3px_0_0_var(--color-white)] alternate:hover:translate-y-[3px] alternate:hover:shadow-none",
            "secondary-alt": "border-2 border-white bg-transparent font-medium text-white shadow-[0_3px_0_0_var(--color-white)] hover:translate-y-[3px] hover:shadow-none",
            link: "gap-2 text-scheme-text",
            "link-alt": "gap-2 text-white",
            ghost: "hover:bg-neutral-darkest hover:text-white",
            none: "",
        },
        size: {
            default: "mb-1 px-6 py-2.5",
            sm: "mb-1 px-5 py-1.5",
            link: "p-0",
            icon: "size-10",
            none: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function Button({ className, variant, size, asChild = false, iconLeft, iconRight, children, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (<Comp data-slot="button" data-variant={variant || "default"} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {iconLeft && iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight && iconRight}
    </Comp>);
}
export { Button, buttonVariants };
