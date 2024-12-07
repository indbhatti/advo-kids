"use client"

import { useEffect } from "react";

export default function Video({ src }: { src: string }) {
  useEffect(() => {
  }, [src]);
  return (
    <div 
    className="rounded-xl overflow-hidden flex justify-center items-center font-sans"
    key={src}
    >
      <video autoPlay controls width="100%">
        <source
          src={src}
          type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
