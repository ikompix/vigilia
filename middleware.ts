import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "erp_session";

function secretKey(): Uint8Array {
  // En prod AUTH_SECRET est toujours défini ; ce fallback évite un crash edge
  // si la variable manque (le token ne validera simplement jamais).
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "");
}

async function isValid(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    await jwtVerify(token, secretKey());
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const onLoginPage = pathname === "/login";
  const authed = await isValid(req.cookies.get(SESSION_COOKIE)?.value);

  // Non authentifié → tout renvoie vers /login (sauf /login lui-même).
  if (!authed && !onLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Déjà authentifié mais sur /login → renvoie vers l'accueil.
  if (authed && onLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Protège tout sauf les assets statiques et les routes internes de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
