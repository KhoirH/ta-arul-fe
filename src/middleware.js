import {
  NextResponse
} from 'next/server';
import { fetcherWithAuth } from './config/fetcher';

export async function middleware(request) {
  try {
    const token = request?.cookies?.get('token')?.value ?? '';
    const verifyToken = await fetcherWithAuth(token).get('/auth/verify-token');
    return NextResponse.next();
  } catch(e) {
    return NextResponse.redirect(new URL('/', request.url)) 
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}

