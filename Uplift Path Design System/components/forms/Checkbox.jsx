import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Checkbox({checked,defaultChecked=false,onCheckedChange,disabled,id,variant="default",style,...props}) {
  const [internal,setInternal] = React.useState(defaultChecked);
  const [hovered,setHovered] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;
  const alt = variant === "alternate";
  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (checked === undefined) setInternal(next);
    onCheckedChange && onCheckedChange(next);
  };
  const border = alt ? "var(--color-white)" : "var(--color-neutral-darkest)";
  const fill = isOn
    ? (alt ? "var(--color-white)" : "var(--color-neutral-darkest)")
    : (hovered && !disabled ? (alt ? "var(--color-white-10)" : "var(--color-neutral-darkest-5)") : "transparent");
  const tick = alt ? "var(--color-neutral-darkest)" : "var(--color-white)";
  return (
    <button
      type="button" role="checkbox" aria-checked={isOn} id={id} data-slot="checkbox" data-variant={variant}
      onClick={toggle} disabled={disabled}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        width:"1.125rem",height:"1.125rem",display:"flex",alignItems:"center",justifyContent:"center",
        borderRadius:"var(--radius-checkbox)",border:"1px solid " + border,
        background:fill,color:tick,
        padding:0,opacity:disabled?0.5:1,transition:"all var(--duration-fast) var(--ease-standard)",...style
      }}
      {...props}
    >
      {isOn && <Icon name="check" size={14} color={tick} />}
    </button>
  );
}
