import { fail, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export const load = async () => {
  return {};
};

export const actions = {
  register: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email || !password) {
      return fail(400, {
        emailRequired: email === null,
        passwordRequired: password === null,
      });
    }

    data.set("passwordConfirm", password?.toString());
    try {
      // create user
      await locals.pb.collection("users").create(data);
      // log the user in
      await locals.pb.collection("users").authWithPassword(email, password);
      // send verification request
      await locals.pb.collection("users").requestVerification(email);
    } catch (error) {
      const errorObj = error as ClientResponseError;
      // if error send error back to form/user
      return fail(500, { fail: true, message: errorObj.data.message });
    }

    // if successful
    throw redirect(303, "/dashboard");
  },
};
