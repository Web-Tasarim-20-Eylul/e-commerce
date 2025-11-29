"use client";

import { ShoppingBag } from "lucide-react";

export default function Logo({ size = "default" }) {
  const sizes = {
    small: {
      icon: "w-6 h-6",
      text: "text-lg",
      container: "gap-2",
    },
    default: {
      icon: "w-8 h-8",
      text: "text-2xl",
      container: "gap-2",
    },
    large: {
      icon: "w-10 h-10",
      text: "text-3xl",
      container: "gap-3",
    },
  };

  const sizeClasses = sizes[size] || sizes.default;

  return (
    <div
      className={`flex items-center ${sizeClasses.container} group cursor-pointer`}
    >
      {/* Icon Container with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg blur-md group-hover:blur-lg transition-all" />
        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2 rounded-lg shadow-lg group-hover:shadow-primary/50 transition-all">
          <ShoppingBag
            className={`${sizeClasses.icon} text-white`}
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* Text with Gradient */}
      <div className="flex flex-col">
        <span
          className={`${sizeClasses.text} font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent`}
        >
          ShopHub
        </span>
        {size === "large" && (
          <span className="text-xs text-default-500 -mt-1">
            Your Shopping Destination
          </span>
        )}
      </div>
    </div>
  );
}
