import React from "react";

function LoaderEffectVideo() {
  return (
    <div className="h-screen flex justify-center items-center">
      <video muted loop autoPlay>
        <source src="/assets/video/loading.webm" type="video/webm" />
      </video>
      <video muted loop autoPlay>
        <source src="/assets/video/loading.webm" type="video/webm" />
      </video>
      <video muted loop autoPlay>
        <source src="/assets/video/loading.webm" type="video/webm" />
      </video>
    </div>
  );
}

export default LoaderEffectVideo;
