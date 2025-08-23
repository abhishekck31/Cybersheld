// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/profile(.*)", "/settings(.*)"])

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) {
//     await auth.protect()
//   }
// })

// Disabled authentication middleware
export default function middleware() {
  // Authentication disabled - all routes are now public
  return
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
