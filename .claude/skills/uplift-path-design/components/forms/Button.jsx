import React from "react";

const base = {display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"0.75rem",whiteSpace:"nowrap",borderRadius:"var(--radius-button)",borderStyle:"solid",borderWidth:"var(--border-width-button)",fontFamily:"var(--font-body)",fontSize:"inherit",transition:"all var(--duration-fast) var(--ease-standard)",textDecoration:"none"};

const sizeStyles = {
  default:{padding:"0.375rem 0.75rem"},
  sm:{padding:"0.25rem 0.625rem"},
  link:{padding:0},
  icon:{width:"2.5rem",height:"2.5rem",padding:0},
  none:{}
};

function variantStyles(variant, hovered) {
  switch (variant) {
    case "alternate":
      return {borderColor:hovered?"var(--color-neutral-lighter)":"var(--color-white)",background:hovered?"var(--color-neutral-lighter)":"var(--color-white)",color:"var(--color-neutral-darkest)",fontWeight:500};
    case "secondary":
      return {borderColor:"var(--color-scheme-border, var(--color-neutral-darkest))",background:hovered?"var(--color-neutral-darkest-5)":"transparent",color:"var(--color-scheme-text, var(--text-body))",fontWeight:500,backdropFilter:"blur(10px)"};
    case "secondary-alt":
      return {borderColor:hovered?"var(--color-white-20)":"var(--color-white)",background:hovered?"var(--color-white-10)":"transparent",color:"var(--color-white)",fontWeight:500};
    case "link":
      return {borderColor:"transparent",background:"transparent",color:"var(--color-scheme-text, var(--text-body))",gap:"0.5rem"};
    case "link-alt":
      return {borderColor:"transparent",background:"transparent",color:"var(--color-white)",gap:"0.5rem"};
    case "ghost":
      return {borderColor:"transparent",background:hovered?"var(--color-neutral-darkest)":"transparent",color:hovered?"var(--color-white)":"var(--color-scheme-text, var(--text-body))"};
    case "none":
      return {};
    default:
      return {borderColor:hovered?"var(--color-caribbean-green-dark)":"var(--color-caribbean-green)",background:hovered?"var(--color-caribbean-green-dark)":"var(--color-caribbean-green)",color:"var(--color-scheme-btn-text, var(--color-neutral-darkest))",fontWeight:500};
  }
}

export function Button({variant="default",size="default",iconLeft,iconRight,disabled,style,children,...props}) {
  const [hovered,setHovered] = React.useState(false);
  return (
    <button
      data-slot="button"
      data-variant={variant}
      disabled={disabled}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{...base,...sizeStyles[size]||sizeStyles.default,...variantStyles(variant,hovered&&!disabled),opacity:disabled?0.5:1,pointerEvents:disabled?"none":undefined,...style}}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
