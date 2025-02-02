'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

// Rules Applied:
// - Interfaces Over Types: Using interface for props
// - Explicit Return Types: Added return type for component
// - Descriptive Naming: Using descriptive names with auxiliary verbs
// - Functional Components: Using functional component with TypeScript interface

interface GetStartedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gradient';
  className?: string;
  children?: React.ReactNode;
}

export function GetStartedButton({ 
  className, 
  variant = 'default',
  children = "Get Started",
  ...props 
}: GetStartedButtonProps): JSX.Element {
  return (
    <Button
      className={cn(
        "font-medium transition-all duration-300",
        variant === 'gradient' && "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-200/50",
        variant === 'default' && "bg-white text-gray-900 hover:bg-rose-50 hover:text-rose-600 border border-gray-200 hover:border-rose-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
