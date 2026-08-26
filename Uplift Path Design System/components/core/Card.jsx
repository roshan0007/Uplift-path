import React from "react";

export function Card({variant="default",style,children,...props}) {
  const variants = {
    default:{border:"var(--border-width-card) solid var(--color-scheme-border, var(--border-default))",background:"var(--color-scheme-foreground, var(--surface-card))",color:"var(--color-scheme-text, var(--text-body))"},
    transparent:{border:"1px solid var(--color-white)",background:"transparent",color:"var(--color-white)"}
  };
  return (
    <div data-slot="card" style={{overflow:"hidden",borderRadius:"var(--radius-card)",...variants[variant],...style}} {...props}>{children}</div>
  );
}

export function BackgroundCard({style,children,...props}) {
  return <div data-slot="bg-card" style={{overflow:"hidden",borderRadius:"var(--radius-card)",...style}} {...props}>{children}</div>;
}

export function CardHeader({style,children,...props}) {
  return <div data-slot="card-header" style={{display:"flex",flexDirection:"column",gap:"0.375rem",padding:"1.5rem",paddingBottom:0,...style}} {...props}>{children}</div>;
}
export function CardTitle({style,children,...props}) {
  return <div data-slot="card-title" style={{lineHeight:1,fontWeight:600,...style}} {...props}>{children}</div>;
}
export function CardDescription({style,children,...props}) {
  return <div data-slot="card-description" style={{fontSize:"0.875rem",color:"var(--color-neutral)",...style}} {...props}>{children}</div>;
}
export function CardContent({style,children,...props}) {
  return <div data-slot="card-content" style={{padding:"1.5rem",paddingBottom:0,...style}} {...props}>{children}</div>;
}
export function CardFooter({style,children,...props}) {
  return <div data-slot="card-footer" style={{display:"flex",alignItems:"center",padding:"1.5rem",...style}} {...props}>{children}</div>;
}
