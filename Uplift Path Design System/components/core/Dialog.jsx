import React from "react";
import { Icon } from "./Icon.jsx";

export function Dialog({open,onOpenChange,closeIconPosition="outside",children,style,...props}) {
  if (!open) return null;
  const close = () => onOpenChange && onOpenChange(false);
  return (
    <div data-slot="dialog" style={{position:"fixed",inset:0,zIndex:50}}>
      <div data-slot="dialog-overlay" onClick={close} style={{position:"absolute",inset:0,background:"color-mix(in srgb,var(--color-neutral-darkest),transparent 10%)"}} />
      {closeIconPosition === "outside" && (
        <button type="button" onClick={close} data-slot="dialog-close" style={{position:"absolute",top:"1rem",right:"1rem",zIndex:51,background:"none",border:"none",opacity:0.6,display:"flex"}}>
          <Icon name="close" size={28} color="var(--color-white)" />
        </button>
      )}
      <div data-slot="dialog-content" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:51,display:"grid",width:"100%",padding:"1.5rem",...style}} {...props}>
        {children}
        {closeIconPosition === "inside" && (
          <button type="button" onClick={close} style={{position:"absolute",top:"1rem",right:"1rem",background:"none",border:"none",opacity:0.6,display:"flex"}}>
            <Icon name="close" size={28} color="var(--color-neutral-darkest)" />
          </button>
        )}
      </div>
    </div>
  );
}

export function DialogHeader({children,style,...props}) {
  return <div data-slot="dialog-header" style={{display:"flex",flexDirection:"column",gap:"0.375rem",...style}} {...props}>{children}</div>;
}
export function DialogTitle({children,style,...props}) {
  return <div data-slot="dialog-title" style={{fontSize:"1.125rem",lineHeight:1,fontWeight:600,letterSpacing:"-0.01em",...style}} {...props}>{children}</div>;
}
export function DialogDescription({children,style,...props}) {
  return <div data-slot="dialog-description" style={{fontSize:"0.875rem",color:"var(--color-neutral)",...style}} {...props}>{children}</div>;
}
export function DialogFooter({children,style,...props}) {
  return <div data-slot="dialog-footer" style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:"0.25rem",...style}} {...props}>{children}</div>;
}
