import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ locals, request }) => {
        const data = await request.formData()

        // remove empty fields
        for (const [key, value] of data.entries()) {
            if (value === '') {
                data.delete(key)
            }
        }

        const userId = locals.pb.authStore.model?.id

        try {
            await locals.pb.collection('users').update(userId, data)
        } catch (error) {
            console.error(error)
            return fail(400, {unknown: true})
        }

        throw redirect(303, '/dashboard')
    }
}