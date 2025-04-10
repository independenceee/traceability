import React from "react";

const Loading = function () {
  const delays = ["300ms", "400ms", "300ms", "200ms", "300ms", "400ms", "100ms", "200ms", "300ms"];

  return (
    <div className="">
      <ul className="grid grid-cols-3 gap-[1px] w-8 h-8">
        {delays.map((delay, index) => (
          <li key={index} className="w-full h-full bg-white animate-scale rounded-[1px]" style={{ animationDelay: delay }} />
        ))}
      </ul>
    </div>
  );
};

export default Loading;
