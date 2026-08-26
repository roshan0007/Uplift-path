import React from "react";
import { Icon } from "../core/Icon.jsx";

const Ctx = React.createContext({value:undefined,setValue:()=>{},variant:"default"});

export function RadioGroup({value,defaultValue,onValueChange,variant="default",children,style,...props}) {
  const [internal,setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const setValue = (v) => { if (value === undefined) setInternal(v); onValueChange && onValueChange(v); };
  return (
    <Ctx.Provider value={{value:current,setValue,variant}}>
      <div role="radiogroup" data-slot="radio-group" style={{display:"grid",gap:"0.5rem",...style}} {...props}>{children}</div>
    </Ctx.Provider>
  );
}

export function RadioGroupItem({value,id,shape="dot",variant,disabled,style,...props}) {
  const ctx = React.useContext(Ctx);
  const [hovered,setHovered] = React.useState(false);
  const isOn = ctx.value === value;
  const alt = (variant || ctx.variant) === "alternate";
  const border = alt ? "var(--color-white)" : "var(--color-neutral-darkest)";
  const fill = isOn
    ? (alt ? "var(--color-white)" : "var(--color-neutral-darkest)")
    : (hovered && !disabled ? (alt ? "var(--color-white-10)" : "var(--color-neutral-darkest-5)") : "transparent");
  const mark = alt ? "var(--color-neutral-darkest)" : "var(--color-white)";
  return (
    <button
      type="button" role="radio" aria-checked={isOn} id={id} data-slot="radio-group-item" data-variant={alt?"alternate":"default"}
      onClick={()=>!disabled&&ctx.setValue(value)} disabled={disabled}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        width:"1.125rem",height:"1.125rem",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",
        borderRadius:"9999px",border:"none",borderBottom:"2px solid " + border,
        boxShadow:"inset 0 0 0 1px " + border,
        background:fill,color:mark,
        padding:0,opacity:disabled?0.5:1,transition:"all var(--duration-fast) var(--ease-standard)",...style
      }}
      {...props}
    >
      {isOn && (shape === "check"
        ? <Icon name="check" size={14} color={mark} />
        : <span style={{width:"0.5rem",height:"0.5rem",borderRadius:"9999px",background:mark}} />)}
    </button>
  );
}
