"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import darkDesktopImage from "@/public/bg-desktop-dark.jpg";
import darkMobileImage from "@/public/bg-mobile-dark.jpg";
import lightDesktopImage from "@/public/bg-desktop-light.jpg";
import lightMobileImage from "@/public/bg-mobile-light.jpg";
import useMediaQuery from "@/customHooks/useMediaQuery";

const PageBackground = () => {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 375px)");

  let backgroundImage;

  if (resolvedTheme === "dark" && isMobile) {
    backgroundImage = darkMobileImage;
  } else if (resolvedTheme === "dark" && !isMobile) {
    backgroundImage = darkDesktopImage;
  } else if (resolvedTheme === "light" && isMobile) {
    backgroundImage = lightMobileImage;
  } else {
    backgroundImage = lightDesktopImage;
  }

  return (
    <div>
      <Image
        src={backgroundImage}
        alt="Background Image"
        quality={100}
        priority={true}
        className={isMobile ? "absolute" : "w-screen h-1/3 absolute"}
      />
    </div>
  );
};

export default PageBackground;
