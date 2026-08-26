import React from "react";
import { Icon } from "./Icon.jsx";

export function Accordion({type="single",defaultValue=[],children,style,...props}) {
  const [open,setOpen] = React.useState(Array.isArray(defaultValue)?defaultValue:[defaultValue]);
  const toggle = (value) => {
    setOpen(prev => prev.includes(value)
      ? prev.filter(v => v !== value)
      : (type === "multiple" ? [...prev,value] : [value]));
  };
  return (
    <div data-slot="accordion" style={style} {...props}>
      {React.Children.map(children, (child,i) =>
        React.isValidElement(child)
          ? React.cloneElement(child,{__open:open.includes(child.props.value),__toggle:()=>toggle(child.props.value),__first:i===0})
          : child)}
    </div>
  );
}

export function AccordionItem({value,children,__open,__toggle,__first,style,...props}) {
  const rule = "1px solid var(--color-scheme-border, var(--border-default))";
  return (
    <div data-slot="accordion-item" style={{borderBottom:rule,borderTop:__first?rule:undefined,...style}} {...props}>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child,{__open,__toggle}) : child)}
    </div>
  );
}

export function AccordionTrigger({children,__open,__toggle,style,...props}) {
  return (
    <button
      type="button" data-slot="accordion-trigger" onClick={__toggle} aria-expanded={!!__open}
      style={{display:"flex",width:"100%",flex:1,alignItems:"center",justifyContent:"space-between",gap:"1rem",padding:"1rem 0",background:"none",border:"none",fontFamily:"var(--font-body)",fontWeight:700,fontSize:"inherit",color:"inherit",textAlign:"left",...style}}
      {...props}
    >
      {children}
      <Icon name="keyboard_arrow_down" size={28} style={{transform:__open?"rotate(180deg)":"none",transition:"transform var(--duration-base)"}} />
    </button>
  );
}

export function AccordionContent({children,__open,__toggle,style,...props}) {
  return (
    <div data-slot="accordion-content" style={{overflow:"hidden",display:__open?"block":"none"}}>
      <div style={{paddingBottom:"1.25rem",...style}} {...props}>{children}</div>
    </div>
  );
}
