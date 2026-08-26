import React from "react";

export function Label({children,style,...props}) {
  return (
    <label data-slot="label" style={{display:"flex",alignItems:"center",gap:"0.5rem",userSelect:"none",fontFamily:"var(--font-body)",...style}} {...props}>
      {children}
    </label>
  );
}
