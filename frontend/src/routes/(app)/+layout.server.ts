import { serializeNonPOJOs } from '$lib/utils.js'

export const load = async ({ locals }) => {
    const user = locals.pb.authStore.model
    return {
        user: serializeNonPOJOs(user)
    }
}