<script lang="ts">
    export let data
    export let form

</script>

<div class="h-[90vh] flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- if form fail, display error message -->
    {#if form?.fail || data?.fail}
        <div class="variant-soft-error px-4 py-2 mb-2 rounded-token">
            {data.fail ? 'Something went wrong with OAuth' : form?.message}
        </div>
    {/if}
    <form action="?/login" method="post">
        <label class="label">
            <span>E-Mail</span>
            <input class="input" name="email" title="E-Mail" type="email" placeholder="mail@example.com" required />
        </label>
        <label class="label mt-4">
            <span>Password</span>
            <input class="input" name="password" title="Password" type="password" placeholder="******" required />
        </label>
        <div class="flex w-full justify-center gap-4 h-16">
            <button class="btn variant-filled w-1/4 mt-4 mb-3 rounded-md" type="submit">Login</button>
            <button class="btn variant-filled w-1/4 mt-4 mb-3 rounded-md" formaction="?/register">Register</button>
        </div>
    </form>
    <hr />
    <form method="post">
        <div class="flex w-full justify-center gap-4 h-16">
            {#each data.providers as provider}
            <button class="btn variant-filled w-1/4 mt-4 mb-3 rounded-md" formaction="?/{provider.name}">
                {provider.displayName}
            </button>
            {/each}
        </div>
    </form>
</div>