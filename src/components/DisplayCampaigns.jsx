import React from "react";

const DisplayInfo = ({ title, info }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-[24px] leading-[36px] text-white">
        {title}
      </h1>
      <p className="font-bold text-[16px] leading-[26px] text-white">
        {info}
      </p>
    </div>
  );
};