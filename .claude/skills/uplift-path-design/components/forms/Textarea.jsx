import React from "react";

export function Textarea({variant="primary",style,...props}) {
  return (
    <textarea
      data-slot="textarea"
      style={{
        display:"flex",width:"100%",minHeight:"2rem",padding:"0.5rem 0",
        background:"transparent",border:"none",
        borderBottom:variant==="secondary"?"2px solid var(--color-white-10)":"2px solid var(--color-neutral-darkest-15)",
        borderRadius:"var(--radius-form)",
        color:variant==="secondary"?"var(--color-white)":"var(--color-scheme-text, var(--text-body))",
        fontFamily:"var(--font-body)",fontSize:"inherit",outline:"none",resize:"vertical",
        transition:"all var(--duration-fast) var(--ease-standard)",...style
      }}
      {...props}
    />
  );
}
