import { serializeNonPOJOs } from '$lib/utils.js'
import type { UsersResponse } from '$lib/types/pocketbase.js'

export const load = async ({ locals }) => {
    // only loads for data belonging to this user
    const user = locals.pb.authStore.model as UsersResponse

    if (user.avatar) {
        user.avatar = await locals.pb.files.getUrl(user, user.avatar, {'thumb': '100x100'})
    }
    return {
        user: serializeNonPOJOs(user) as UsersResponse
    }
}