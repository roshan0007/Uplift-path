import React from "react";

export function Input({icon,iconPosition="left",prefix,prefixPosition="left",variant="primary",style,...props}) {
  const affix = {minHeight:"2.75rem",flexShrink:0,padding:"0.5rem 0.75rem",border:"1px solid var(--color-scheme-border, var(--border-default))"};
  const field = {
    display:"flex",width:"100%",minHeight:"2rem",padding:"0.5rem 0",
    background:"transparent",border:"none",
    borderBottom:variant==="secondary"?"2px solid var(--color-white-10)":"2px solid var(--color-neutral-darkest-15)",
    color:variant==="secondary"?"var(--color-white)":"var(--color-scheme-text, var(--text-body))",
    fontFamily:"var(--font-body)",fontSize:"inherit",outline:"none",
    transition:"all var(--duration-fast) var(--ease-standard)",
    paddingLeft:icon&&iconPosition==="left"?"2.75rem":undefined,
    paddingRight:icon&&iconPosition==="right"?"2.75rem":undefined,
    ...style
  };
  return (
    <div style={{position:"relative",display:"flex",width:"100%",alignItems:"center"}}>
      {icon && iconPosition==="left" && <div style={{position:"absolute",left:"0.75rem",display:"flex"}}>{icon}</div>}
      {prefix && prefixPosition==="left" && <div style={{...affix,borderRight:"none"}}>{prefix}</div>}
      <input data-slot="input" style={field} {...props} />
      {icon && iconPosition==="right" && <div style={{position:"absolute",right:"0.75rem",display:"flex"}}>{icon}</div>}
      {prefix && prefixPosition==="right" && <div style={{...affix,borderLeft:"none"}}>{prefix}</div>}
    </div>
  );
}
