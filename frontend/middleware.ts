// // middleware.ts
import { NextResponse } from 'next/server'

// export function middleware(req: any) {
//   const url = req.nextUrl.clone()
//   const isTasksPage = url.pathname.startsWith('/tasks')
//   const isHomePage = url.pathname === '/'

//   // Static check: agar cookie exist nahi karti to /tasks -> /
//   const hasAuthCookie = req.cookies.has('supabase-auth-token') || req.cookies.has('sb-access-token')

//   if (isTasksPage && !hasAuthCookie) {
//     url.pathname = '/'
//     return NextResponse.redirect(url)
//   }

//   if (isHomePage && hasAuthCookie) {
//     url.pathname = '/tasks'
//     return NextResponse.redirect(url)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/', '/tasks/:path*'],
// }


// middleware.ts
export const config = { matcher: [] } // ab middleware kuch bhi block nahi karega
export function middleware(req: any) {
  return NextResponse.next()
}
