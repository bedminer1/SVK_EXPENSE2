import { env } from "$env/dynamic/private";
import PocketBase from "pocketbase";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

// cookie-based authentication
export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(env.PB_URL);

  // load store from request cookie string
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  try {
    // refresh loaded auth model if any
    event.locals.pb.authStore.isValid &&
      (await event.locals.pb.collection("users").authRefresh());
  } catch (_) {
    // clear auth store on failed refresh
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  // send back pb_auth cookie to client with latest store this.state.
  response.headers.append(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ sameSite: "Lax", httpOnly: false })
  );

  return response;
};

const unprotectedPrefix = ["/login", '/register', "/auth"];
export const authorization: Handle = async ({ event, resolve }) => {
  // protect routes under /authenticated
  if (
    !unprotectedPrefix.some((path) => event.url.pathname.startsWith(path)) &&
    event.url.pathname !== "/"
  ) {
    const loggedIn = await event.locals.pb.authStore;
    if (!loggedIn) {
      throw redirect(303, "/login");
    }
  }

  const result = await resolve(event);
  return result;
};

export const handle = sequence(authentication, authorization);
