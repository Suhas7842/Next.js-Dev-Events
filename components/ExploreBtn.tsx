"use client";

import posthog from "posthog-js";

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture("explore_events_clicked");
  };

  return (
    <button id="explore-btn" className="mt-7 mx-auto" onClick={handleClick}>
      <a href="#events">
        Explore Events
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default ExploreBtn;