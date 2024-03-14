import { fail, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";

export const load = async ({ locals }) => {
  // if user is logged in, redirect to dashboard
  if (locals.pb.authStore.model) return redirect(303, "/dashboard");
  return {};
};

export const actions = {
  register: async ({ locals, request }) => {
    //  get form data
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    // check if data is valid
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
      await locals.pb
        .collection("users")
        .authWithPassword(email.toString(), password.toString());
      // send verification request
      await locals.pb.collection("users").requestVerification(email.toString());
    } catch (error) {
      const errorObj = error as ClientResponseError;
      // if error send error back to form/user
      return fail(500, { fail: true, message: errorObj.data.message });
    }

    // if successful
    throw redirect(303, "/dashboard");
  },
  //   same thing as register minus creating a user and doing email verification
  login: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      return fail(400, {
        emailRequired: email === null,
        passwordRequired: password === null,
      });
    }

    try {
      await locals.pb
        .collection("user")
        .authWithPassword(email.toString(), password.toString());
    } catch (error) {
      const errorObj = error as ClientResponseError;
      return fail(500, { fail: true, message: errorObj.data.message });
    }

    throw redirect(303, "/dashboard");
  },

  reset: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get("email");

    // check if email valid
    if (!email) {
      return fail(400, { emailRequired: email === null });
    }

    try {
      await locals.pb
        .collection("users")
        .requestPasswordReset(email.toString());
    } catch (error) {
      const errorObj = error as ClientResponseError;
      return fail(500, { fail: true, message: errorObj.data.message });
    }

    // if successful, keep user on same page
    throw redirect(303, "/login");
  },
};
