import type { RequestHandler } from "@builder.io/qwik-city";

export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
}

export const onRequest: RequestHandler = async ({ cookie, env, sharedMap }) => {
  const endpoint = env.get("PUBLIC_API_ENDPOINT");
  if (!endpoint) {
    console.error(
      "[plugin@auth] Missing PUBLIC_API_ENDPOINT. Check your .env.local!",
    );
    return;
  }

  // Check for "auth_token" cookie directly via Qwik's API
  const tokenCookie = cookie.get("auth_token");
  if (!tokenCookie) {
    console.warn("[plugin@auth] No auth_token cookie found.");
    return;
  }

  const token = tokenCookie.value;
  if (!token) {
    console.warn("[plugin@auth] auth_token cookie is empty.");
    return;
  }

  // Validate token by calling the /user endpoint in your Laravel API
  const user = await getAuthenticatedUser(token, endpoint);
  if (user) {
    sharedMap.set("user", user);
  }
};

async function getAuthenticatedUser(
  token: string,
  endpoint: string,
): Promise<User | null> {
  try {
    const res = await fetch(`${endpoint}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const user = (await res.json()) as User;
      console.info("[plugin@auth] Successfully retrieved user:", user);
      return user;
    } else {
      console.warn(
        `[plugin@auth] Auth failed: ${res.status} ${res.statusText}`,
      );
      return null;
    }
  } catch (error) {
    console.error("[plugin@auth] Error fetching user:", error);
    return null;
  }
}
