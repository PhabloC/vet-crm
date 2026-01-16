"use client";

import { ButtonProps } from "./types";

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "cursor-pointer bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm hover:shadow",
    secondary:
      "cursor-pointer bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 focus:ring-zinc-500 border border-zinc-300",
    danger:
      "cursor-pointer bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm hover:shadow",
    ghost:
      "cursor-pointer text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 focus:ring-zinc-500",
    link: "cursor-pointer text-blue-600 hover:text-blue-700 active:text-blue-800 focus:ring-blue-500 underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const iconSizeStyles = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

  const iconElement = icon && !isLoading && (
    <span className={iconSizeStyles[size]}>{icon}</span>
  );

  const loadingSpinner = isLoading && (
    <svg
      className={`${iconSizeStyles[size]} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {iconPosition === "left" && (loadingSpinner || iconElement)}
      {children && <span>{children}</span>}
      {iconPosition === "right" && (loadingSpinner || iconElement)}
    </button>
  );
}
