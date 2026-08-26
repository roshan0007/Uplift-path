import React from "react";
import { Icon } from "./Icon.jsx";

export function VideoIframe({video,style,...props}) {
  const [loaded,setLoaded] = React.useState(false);
  return (
    <>
      {!loaded && (
        <Icon name="progress_activity" size={64} color="var(--color-white)"
          style={{margin:"0 auto",animation:"spin 1s linear infinite"}} />
      )}
      <iframe
        src={video} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
        onLoad={()=>setLoaded(true)}
        style={{margin:"0 auto",aspectRatio:"16 / 9",width:"100%",height:"100%",border:"none",visibility:loaded?"visible":"hidden",...style}}
        {...props}
      />
    </>
  );
}
