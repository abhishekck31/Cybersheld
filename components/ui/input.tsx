import type * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-gray-900 placeholder:text-gray-500 selection:bg-gray-700 selection:text-white dark:bg-gray-800/30 border-gray-300 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-indigo-600 focus-visible:ring-indigo-600/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-600/20 dark:aria-invalid:ring-red-600/40 aria-invalid:border-red-600",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
