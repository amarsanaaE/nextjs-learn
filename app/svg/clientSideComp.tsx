"use client";

import React, { useEffect } from "react";

export default function ClientSideComp() {
  useEffect(() => {
    const root = document.querySelector<HTMLDivElement>(":root");
    const mouth = document.querySelector<SVGPathElement>("#mouth");
    const rside = document.querySelector<SVGPathElement>("#r-side");
    const lside = document.querySelector<SVGPathElement>("#l-side");
    const dimple = document.querySelector<SVGPathElement>("#dimple");

    if (root && mouth && rside && lside && dimple) {
      const totalLengthMouth = mouth.getTotalLength();
      const totalLengthRside = rside.getTotalLength();
      const totalLengthLside = lside.getTotalLength();
      const totalLengthDimple = dimple.getTotalLength();
      root.style.setProperty("--mouth-dash", totalLengthMouth.toString());
      root.style.setProperty("--rside-dash", totalLengthRside.toString());
      root.style.setProperty("--lside-dash", totalLengthLside.toString());
      root.style.setProperty("--dimple-dash", totalLengthDimple.toString());
    }
  }, []);

  return (
    <div className="h-screen bg-black text-white grid place-itemsCenter">
      <div className="bg-white w-[200px] h-[200px]">
        <svg
          className="dental-logo w-full h-full"
          viewBox="0 0 230 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="dimple"
            d="M150.5 108.5C154.536 94.6796 153.942 88.9167 145.5 83.4999C152.299 83.4313 157.5 87.5 157.5 93.9995C157.5 98.9997 155.5 104 150.5 108.5Z"
          />
          <path
            id="r-side"
            d="M129.5 41.0002C113.534 51.6047 104.911 53.5944 90 51.5002C98.1917 57.2739 107.5 59.5002 116.5 57.0002C129.5 55.5002 162 33.0002 177 29.5002C190.015 27.4602 195.01 29.9714 201 39.5002C208.595 61.89 196.638 90.913 175 143C167.185 159.429 162.922 168.135 157.5 171.5C151.433 174.24 148.397 168.812 143 158.5C128.106 129.803 105 134 98 147.5C104.293 142.742 108.303 141.985 116.5 145.5C123.914 150.521 127 158.5 134 174C143.484 195 159 201.5 168 188.5L220.5 86.5002C229.729 61.9464 231.607 49.7355 228.5 31.0002C219 -5.49962 183 -7.99976 157.5 14.5002L129.5 41.0002Z"
          />
          <path
            id="l-side"
            d="M1.00184 54.4999C3.00184 80.9999 49.5018 153 78.0018 183.5C40 123.5 8 71 27.0018 36.9999C35.0018 26.5 53 25.4127 66.0018 33.4999C83.4201 44.334 91.7977 48.4026 102.002 48.4999C112.86 47.5295 117.085 43.8692 123.502 35.4999C111.214 41.291 103.42 40.2959 88.5018 29.9999C70.7432 14.0639 55 7 35.0018 9.99986C11.5035 15.4999 -0.317201 36.9999 1.00184 54.4999Z"
          />
          <path
            id="mouth"
            d="M144.5 94C119 115 94.5 118.5 66.5 96C76.5 115 89.5 124.5 106.5 124.5C123.5 124.5 139.5 112.5 144.5 94Z"
          />
        </svg>
        {/* <svg
          className="dental-logo"
          viewBox="0 0 230 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="dimple"
            d="M150.5 108.5C154.536 94.6796 153.942 88.9167 145.5 83.4999C152.299 83.4313 157.5 87.5 157.5 93.9995C157.5 98.9997 155.5 104 150.5 108.5Z"
          />
          <path
            id="r-side"
            d="M129.5 41.0002C113.534 51.6047 104.911 53.5944 90 51.5002C98.1917 57.2739 107.5 59.5002 116.5 57.0002C129.5 55.5002 162 33.0002 177 29.5002C190.015 27.4602 195.01 29.9714 201 39.5002C208.595 61.89 196.638 90.913 175 143C167.185 159.429 162.922 168.135 157.5 171.5C151.433 174.24 148.397 168.812 143 158.5C128.106 129.803 105 134 98 147.5C104.293 142.742 108.303 141.985 116.5 145.5C123.914 150.521 127 158.5 134 174C143.484 195 159 201.5 168 188.5L220.5 86.5002C229.729 61.9464 231.607 49.7355 228.5 31.0002C219 -5.49962 183 -7.99976 157.5 14.5002L129.5 41.0002Z"
          />
          <path
            id="l-side"
            d="M1.00184 54.4999C3.00184 80.9999 49.5018 153 78.0018 183.5C40 123.5 8 71 27.0018 36.9999C35.0018 26.5 53 25.4127 66.0018 33.4999C83.4201 44.334 91.7977 48.4026 102.002 48.4999C112.86 47.5295 117.085 43.8692 123.502 35.4999C111.214 41.291 103.42 40.2959 88.5018 29.9999C70.7432 14.0639 55 7 35.0018 9.99986C11.5035 15.4999 -0.317201 36.9999 1.00184 54.4999Z"
          />
          <path
            id="mouth"
            d="M144.5 94C119 115 94.5 118.5 66.5 96C76.5 115 88.5 124.5 106.5 124.5C124.5 124.5 139.5 112.5 144.5 94Z"
          />
          <defs>
            <linearGradient
              id="r_side_gradient"
              x1="133"
              y1="-19"
              x2="203"
              y2="222.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2A9EDE" />
              <stop offset="0.275" stopColor="#51A4D2" />
              <stop offset="0.465" stopColor="#98CCE9" />
              <stop offset="0.64" stopColor="#359AD1" />
              <stop offset="1" stopColor="#0E4461" />
            </linearGradient>
            <linearGradient
              id="l_side_gradient"
              x1="-6.5"
              y1="-9"
              x2="110.5"
              y2="206"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#91ED48" />
              <stop offset="0.372753" stopColor="#80BC50" />
              <stop offset="0.485" stopColor="#93F644" />
              <stop offset="0.597631" stopColor="#79BA45" />
              <stop offset="1" stopColor="#4B990D" />
            </linearGradient>
            <linearGradient
              id="mouth_gradient"
              x1="92"
              y1="32"
              x2="119.5"
              y2="177"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4AB7F3" />
              <stop offset="0.449707" stopColor="#3C9ED4" />
              <stop offset="0.575593" stopColor="#64C3F8" />
              <stop offset="0.660953" stopColor="#0C94E0" />
              <stop offset="1" stopColor="#052739" />
            </linearGradient>
          </defs>
        </svg> */}
      </div>
    </div>
  );
}
