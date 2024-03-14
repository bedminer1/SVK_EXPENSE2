import { env } from "$env/dynamic/private";
import PocketBase from "pocketbase";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const authentication: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(env.PB_URL);

  return await resolve(event);
};

export const handle = sequence(authentication)
