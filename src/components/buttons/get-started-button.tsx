'use client';

import { useModalStore } from "@/store/modal-store";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

// Rules Applied:
// - Interfaces Over Types: Using interface for props
// - Explicit Return Types: Added return type for component
// - Descriptive Naming: Using descriptive names with auxiliary verbs
// - Functional Components: Using functional component with TypeScript interface

interface GetStartedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gradient';
  size?: 'default' | 'lg';
}

export function GetStartedButton({ 
  className, 
  variant = 'default',
  size = 'default',
  ...props 
}: GetStartedButtonProps): JSX.Element {
  const { openPricing } = useModalStore();

  return (
    <button
      onClick={openPricing}
      className={cn(
        "font-medium transition-all duration-300 transform hover:scale-[1.02]",
        size === 'lg' ? "py-3 px-6 text-base" : "py-2.5 px-4 text-sm",
        variant === 'gradient'
          ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 hover:shadow-lg hover:shadow-rose-100/50"
          : "bg-gray-900 text-white hover:bg-rose-600 hover:shadow-lg",
        "rounded-lg",
        className
      )}
      {...props}
    >
      {props.children || "Get Started"}
    </button>
  );
}
