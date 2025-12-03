import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center py-4 text-sm text-gray-500 bg-gray-50 z-20">
      © {new Date().getFullYear()} Designed and Developed by{" "}
      <a
        href="https://chetan-portfolio.onrender.com"
        className="text-black font-[400px] cursor-pointer"
      >
        Chetan Badgujar
      </a>
    </footer>
  );
}
