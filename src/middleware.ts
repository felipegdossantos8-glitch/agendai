import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simulação do Middleware de Autenticação
  const token = request.cookies.get('agendai_session');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // Se tentar acessar o /dashboard sem cookie de sessão, redireciona para a tela de login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
