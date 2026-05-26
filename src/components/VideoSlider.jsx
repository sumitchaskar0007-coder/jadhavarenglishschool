import React from "react";

const VideoSlider = () => {
  return (
    <div>
      <video width="100%" controls>
        <source src="https://youtu.be/lganndNdUr0?si=ImhMH14wXtYE06Cn" type="video/mp4" />
        Your browser does not support videos.
      </video>
    </div>
  );
};

export default VideoSlider;
