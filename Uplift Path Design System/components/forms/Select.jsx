import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Select({value,defaultValue,onValueChange,placeholder="Select one...",options=[],variant="primary",style,...props}) {
  const [open,setOpen] = React.useState(false);
  const [internal,setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const selected = options.find(o => o.value === current);
  const pick = (v) => { if (value === undefined) setInternal(v); onValueChange && onValueChange(v); setOpen(false); };
  return (
    <div style={{position:"relative",width:"100%",...style}} {...props}>
      <button
        type="button" data-slot="select-trigger" onClick={()=>setOpen(!open)}
        style={{
          display:"flex",width:"100%",minHeight:"2rem",alignItems:"center",justifyContent:"space-between",gap:"0.25rem",
          padding:"0.5rem 0",background:"transparent",border:"none",
          borderBottom:variant==="secondary"?"2px solid var(--color-white-10)":"2px solid var(--color-neutral-darkest-15)",
          borderRadius:"var(--radius-form)",fontFamily:"var(--font-body)",fontSize:"inherit",
          color:selected?"var(--color-scheme-text, var(--text-body))":"var(--color-neutral-darkest-60)",textAlign:"left"
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <Icon name="keyboard_arrow_down" size={20} style={{transform:open?"rotate(180deg)":"none",transition:"transform var(--duration-base)"}} />
      </button>
      {open && (
        <div data-slot="select-content" style={{position:"absolute",zIndex:50,top:"calc(100% + 0.25rem)",left:0,minWidth:"100%",maxHeight:"24rem",overflow:"auto",padding:"0.25rem",border:"1px solid var(--color-scheme-border, var(--border-default))",background:"var(--color-scheme-background, var(--surface-card))",color:"var(--color-scheme-text, var(--text-body))"}}>
          {options.map(o => (
            <div key={o.value} data-slot="select-item" onClick={()=>pick(o.value)}
              style={{position:"relative",display:"flex",alignItems:"center",padding:"0.5rem 0.75rem",cursor:"default"}}>
              {o.label}
              {o.value === current && <span style={{position:"absolute",right:"0.5rem",display:"flex"}}><Icon name="check" size={20} /></span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
