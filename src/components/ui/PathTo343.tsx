import React, { useRef, useEffect, useState } from "react";

const PathTo343 = () => {
  const svgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  return (
    <div ref={svgRef}>
      {isVisible && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="eaf-2f5c-0"
          overflow="hidden"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1920 1080"
        >
          <defs>
            <clipPath id="eaf-2f5c-1">
              <path d="M0 0h1920v1080H0z" />
            </clipPath>
            <style>
              {`
                @keyframes eaf-2f5c-2 {
                  0% {
                    animation-timing-function: step-start;
                  }
                  7.34% {
                    stroke-dashoffset: 100;
                    animation-timing-function: ease;
                  }
                  47.68%, to {
                    stroke-dashoffset: 0;
                  }
                }
                #eaf-2f5c-0 * {
                  animation: 5000ms linear 1 normal both running;
                  offset-rotate: 0deg;
                }
              `}
            </style>
          </defs>
          <g
            clipPath="url('#eaf-2f5c-1')"
            style={{
              isolation: "isolate",
            }}
          >
            <path
              fill="none"
              stroke="#6666665c"
              strokeDasharray={100}
              strokeDashoffset={100}
              strokeMiterlimit={10}
              strokeWidth={6}
              d="M47.5 222.5c21-1 26.63 20.63 38 19 21.17-3.04 23.12-46.99 38-48 21.5-1.46 36.92 92.99 54 92 20.16-1.17 22.08-135 38-135 26.1 0 28.9 182 55 182S283.9 120 310 120s31.4 255.5 57.5 255.5S379.9 81 406 81s29.4 341.5 55.5 341.5 9.89-396 36-396 33.89 366 60 366S565.89 73 592 73s32.39 270.5 58.5 270.5 9.9-227 36-227c18.08 0 38.16 185.21 57 184 16.03-1.03 17.29-136.18 37.5-137.5 17-1.11 33.36 93.31 54.5 91.5 13.76-1.18 10.13-55.66 32.5-60.5 9.05-1.96 16.08 27.09 32 33 11.35 4.22 15 2 25-1"
              opacity={0.68}
              pathLength={100}
              style={{
                animationName: "eaf-2f5c-2",
              }}
              transform="translate(-31.022 73.581) scale(2.0776)"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default PathTo343;
