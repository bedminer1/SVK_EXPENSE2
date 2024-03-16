import { serializeNonPOJOs } from "$lib/utils";
import type { AuthModel } from 'pocketbase';

// load in instance of user
export const load = async ({ locals }) => {
    const user = locals.pb.authStore.model
    console.log(user)
    return {user: serializeNonPOJOs(user)} as { user: AuthModel }

}