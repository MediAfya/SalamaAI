import React from "react";

import { DisplayCampaigns } from "../components";


const DisplayInfo = ({ title, info }) => {
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={data}
    />
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-[24px] leading-[36px] text-white">
        {title}
      </h1>
      <p className="font-bold text-[16px] leading-[26px] text-white">
        {info}
      </p>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-bold text-[24px] leading-[36px] text-white">
          {title}
        </h1>
        <p className="font-bold text-[16px] leading-[26px] text-white">
          {info}
        </p>
      </div>
    </>
    </div>
  );
};