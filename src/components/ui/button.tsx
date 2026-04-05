import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-zinc-900 text-white hover:bg-zinc-700",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  danger: "bg-red-700 text-white hover:bg-red-600",
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
