import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50 focus-visible:ring-[3px] aria-invalid:ring-red-600/20 dark:aria-invalid:ring-red-600/40 aria-invalid:border-red-600",
  {
    variants: {
      variant: {
        default: "bg-gray-700 text-white shadow-xs hover:bg-gray-800",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 dark:bg-red-600/60",
        outline:
          "border bg-white shadow-xs hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-800/30 dark:border-gray-700 dark:hover:bg-cyan-900/40 dark:hover:text-cyan-300 dark:hover:border-cyan-400",
        secondary: "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700",
        ghost: "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-800/50",
        link: "text-gray-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
