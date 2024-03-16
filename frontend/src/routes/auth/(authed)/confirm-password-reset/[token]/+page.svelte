<script lang="ts">
    import { enhance } from "$app/forms";

    export let data
</script>

{#if !Object.keys(data).includes('success')}
    <aside class="alert variant-ghost-success">
        <div class="alert-message">
            <h3 class="h3">Change your password</h3>
            <p>Enter your new password</p>
            <hr class="my-2 !border-t-surface-50">
            <form action="?/confirmPasswordReset" method="post" use:enhance>
                <input type="hidden" name="token" value={data.token} />
                <input type="password" name="password" class="input variant-filled my-2">
                <button type="submit" class="btn variant-filled">Update Password</button>
            </form>
        </div>
    </aside>
{:else if data.success} 
    <aside class="alert variant-ghost-success">
        <div class="alert-message">
            <h3 class="h3">Change your password</h3>
            <p>{!data.resend ? 'You successfuly updated your password' : 'Update password requested. Please check your email.'}</p>
            {#if !data.resend}
                <a href="/login" class="btn variant-filled">Go back to login</a>
            {/if}
        </div>
    </aside>
{:else}
    <aside class="alert variant-ghost-error">
        <div class="alert-message">
            <h3 class="h3">Change your password</h3>
            <p>{!data.resend ? 'Invalid token, please enter email again.' : 'Failed to request update password! Please try again.'}</p>
            <hr class="my-2 !border-t-surface-50">
            <form action="?/confirmPasswordReset" method="post" use:enhance>
                <input type="email" name="email" class="input variant-filled my-2" value={data.user?.email || ""}>
                <button type="submit" class="btn variant-filled">Update Password</button>
            </form>
        </div>
    </aside>
{/if}