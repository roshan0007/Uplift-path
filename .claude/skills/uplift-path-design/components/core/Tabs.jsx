import React from "react";

const Ctx = React.createContext({value:undefined,setValue:()=>{}});

export function Tabs({value,defaultValue,onValueChange,children,style,...props}) {
  const [internal,setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const setValue = (v) => { if (value === undefined) setInternal(v); onValueChange && onValueChange(v); };
  return <Ctx.Provider value={{value:current,setValue}}><div data-slot="tabs" style={style} {...props}>{children}</div></Ctx.Provider>;
}

export function TabsList({children,style,...props}) {
  return <div data-slot="tabs-list" role="tablist" style={{display:"flex",gap:"0.5rem",...style}} {...props}>{children}</div>;
}

export function TabsTrigger({value,children,style,...props}) {
  const ctx = React.useContext(Ctx);
  const active = ctx.value === value;
  return (
    <button
      type="button" role="tab" aria-selected={active} data-slot="tabs-trigger" data-state={active?"active":"inactive"}
      onClick={()=>ctx.setValue(value)}
      style={{
        display:"inline-flex",alignItems:"center",justifyContent:"center",whiteSpace:"nowrap",
        padding:"0.625rem 1.5rem",borderRadius:"var(--radius-button)",
        border:"2px solid " + (active ? "var(--color-scheme-border, var(--border-default))" : "transparent"),
        background:"transparent",color:"inherit",fontFamily:"var(--font-body)",fontSize:"inherit",...style
      }}
      {...props}
    >{children}</button>
  );
}

export function TabsContent({value,children,style,...props}) {
  const ctx = React.useContext(Ctx);
  if (ctx.value !== value) return null;
  return <div data-slot="tabs-content" role="tabpanel" style={{animation:"tabs var(--duration-slow) var(--ease-tabs) forwards",...style}} {...props}>{children}</div>;
}
