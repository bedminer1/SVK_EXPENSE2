import { serializeNonPOJOs } from '$lib/utils.js'

export const load = async ({ locals }) => {
    // only loads for data belonging to this user
    const user = locals.pb.authStore.model
    return {
        user: serializeNonPOJOs(user)
    }
}