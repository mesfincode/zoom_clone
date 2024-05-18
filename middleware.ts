import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'
])

export default clerkMiddleware((auth,req)=>{
    if(protectRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};