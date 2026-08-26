import React from "react";
import { Button } from "../forms/Button.jsx";
import { Icon } from "./Icon.jsx";

const Ctx = React.createContext(null);

export function Carousel({loop=true,setApi,children,style,...props}) {
  const [index,setIndex] = React.useState(0);
  const [count,setCount] = React.useState(0);
  const api = React.useMemo(()=>({
    scrollTo:setIndex,
    selectedScrollSnap:()=>index,
    scrollPrev:()=>setIndex(i=>loop?(i-1+count)%count:Math.max(0,i-1)),
    scrollNext:()=>setIndex(i=>loop?(i+1)%count:Math.min(count-1,i+1)),
    on:()=>{},off:()=>{}
  }),[index,count,loop]);
  React.useEffect(()=>{setApi && setApi(api);},[api,setApi]);
  return (
    <Ctx.Provider value={{index,setIndex,count,setCount,loop}}>
      <div data-slot="carousel" role="region" aria-roledescription="carousel" style={{position:"relative",...style}} {...props}>{children}</div>
    </Ctx.Provider>
  );
}

export function CarouselContent({children,style,...props}) {
  const ctx = React.useContext(Ctx);
  const items = React.Children.toArray(children);
  React.useEffect(()=>{ctx.setCount(items.length);},[items.length]);
  return (
    <div data-slot="carousel-content" style={{overflow:"hidden"}}>
      <div style={{display:"flex",transform:`translateX(-${ctx.index*100}%)`,transition:"transform var(--duration-slow) var(--ease-standard)",...style}} {...props}>{children}</div>
    </div>
  );
}

export function CarouselItem({children,style,...props}) {
  return <div role="group" aria-roledescription="slide" data-slot="carousel-item" style={{minWidth:0,flex:"0 0 100%",...style}} {...props}>{children}</div>;
}

function navStyle(side) {
  return {position:"absolute",[side]:0,top:"50%",transform:"translateY(-50%)",width:"3rem",height:"3rem",borderRadius:"var(--radius-carousel)",borderWidth:"1px",background:"var(--color-scheme-background, var(--surface-page))"};
}

export function CarouselPrevious({style,...props}) {
  const ctx = React.useContext(Ctx);
  return (
    <Button variant="secondary" size="icon" aria-label="Previous slide"
      onClick={()=>ctx.setIndex(i=>ctx.loop?(i-1+ctx.count)%ctx.count:Math.max(0,i-1))}
      style={{...navStyle("left"),...style}} {...props}>
      <Icon name="arrow_back" size={24} />
    </Button>
  );
}

export function CarouselNext({style,...props}) {
  const ctx = React.useContext(Ctx);
  return (
    <Button variant="secondary" size="icon" aria-label="Next slide"
      onClick={()=>ctx.setIndex(i=>ctx.loop?(i+1)%ctx.count:Math.min(ctx.count-1,i+1))}
      style={{...navStyle("right"),...style}} {...props}>
      <Icon name="arrow_forward" size={24} />
    </Button>
  );
}

export function CarouselDots({style,...props}) {
  const ctx = React.useContext(Ctx);
  return (
    <div style={{display:"flex",justifyContent:"center",gap:"6px",...style}} {...props}>
      {Array.from({length:ctx.count}).map((_,i)=>(
        <button key={i} type="button" onClick={()=>ctx.setIndex(i)} aria-label={`Slide ${i+1}`}
          style={{width:"0.5rem",height:"0.5rem",borderRadius:"9999px",border:"none",padding:0,
            background:i===ctx.index?"var(--color-scheme-text, var(--text-body))":"color-mix(in srgb,var(--color-scheme-text, var(--text-body)),transparent 80%)"}} />
      ))}
    </div>
  );
}
