"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import sun from "@/public/icon-sun.svg";
import moon from "@/public/icon-moon.svg";

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex justify-between desktop:pt-16 desktop:pb-8 py-10  items-center">
      <h1>TODO</h1>
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle Light & Dark Mode"
      >
        {resolvedTheme === "dark" ? (
          <Image
            src={sun}
            alt="Sun Icon (toggle light mode)"
            width="26"
            height="26"
            className="w-5 h-5 desktop:w-7 desktop:h-7"
          ></Image>
        ) : (
          <Image
            src={moon}
            alt="Moon Icon (toggle dark mode)"
            width="26"
            height="26"
            className="w-5 h-5 desktop:w-7 desktop:h-7"
          ></Image>
        )}
      </button>
    </div>
  );
};

export default Header;
