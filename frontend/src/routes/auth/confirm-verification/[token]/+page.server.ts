import { redirect } from "@sveltejs/kit";

export const load = async ({params, locals, url}) => {
    const token = params.token
    const resend = url.searchParams.has('resend')
    const success = url.searchParams.get('success') === 'true'

    if (resend) {
        return {resend, success}
    }
    try {
        await locals.pb.collection('users').confirmVerification(token)
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false }
    }
}

export const actions = {
    resendVerification: async ({ locals, request }) => {
        const data = await request.formData()
        const email = data.get('email') as string

        try {
            await locals.pb.collection('users').requestVerification(email)
        } catch (error) {
            console.error(error)
            return redirect(300, `?success=false&resend`)
        }

        return redirect(300, `?success=true&resend`)
    }
}
