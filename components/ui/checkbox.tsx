"use client"

import type * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-gray-300 dark:bg-gray-100/30 data-[state=checked]:bg-cyan-600 data-[state=checked]:text-white dark:data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 focus-visible:border-cyan-600 focus-visible:ring-cyan-600/50 aria-invalid:ring-red-600/20 dark:aria-invalid:ring-red-600/40 aria-invalid:border-red-600 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
